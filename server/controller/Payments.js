const { instance } = require("../config/razorpay");
const Course = require("../Models/Course");
const User = require("../Models/User");
const CourseProgress = require("../Models/CourseProgress");
const mailsender = require("../Utils/mailsender");
const crypto = require("crypto");

const normalizeCourseIds = (courses) => {
    if (!Array.isArray(courses) || courses.length === 0) return [];
    return [...new Set(courses.map(String))];
};

exports.capturePayment = async (req, res) => {
    try {
        const courseIds = normalizeCourseIds(req.body.courses);
        if (!courseIds.length) {
            return res.status(400).json({ succsess: false, message: "Select at least one course" });
        }

        const courses = await Course.find({ _id: { $in: courseIds } });
        if (courses.length !== courseIds.length) {
            return res.status(404).json({ succsess: false, message: "One or more courses were not found" });
        }
        if (courses.some((course) => course.studentEnrolled.some((id) => id.toString() === req.user.id))) {
            return res.status(409).json({ succsess: false, message: "You are already enrolled in a selected course" });
        }

        const amount = courses.reduce((sum, course) => sum + Number(course.Price), 0) * 100;
        if (!Number.isSafeInteger(amount) || amount <= 0) {
            return res.status(400).json({ succsess: false, message: "Invalid course price" });
        }

        const order = await instance.orders.create({
            amount,
            currency: "INR",
            receipt: `course_${Date.now()}_${req.user.id.slice(-6)}`,
            notes: { userId: req.user.id, courseIds: courseIds.join(",") },
        });
        return res.status(200).json({ succsess: true, message: order });
    } catch (error) {
        console.error("Payment order creation failed", error);
        return res.status(500).json({ succsess: false, message: "Unable to create the payment order" });
    }
};

exports.verifySignature = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ succsess: false, message: "Razorpay payment details are required" });
        }

        const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expected = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(payload).digest("hex");
        const valid = razorpay_signature.length === expected.length && crypto.timingSafeEqual(
            Buffer.from(razorpay_signature), Buffer.from(expected)
        );
        if (!valid) {
            return res.status(400).json({ succsess: false, message: "Invalid payment signature" });
        }

        const order = await instance.orders.fetch(razorpay_order_id);
        const courseIds = normalizeCourseIds(order.notes?.courseIds?.split(","));
        if (order.notes?.userId !== req.user.id || !courseIds.length || order.status !== "paid") {
            return res.status(400).json({ succsess: false, message: "Payment order is not valid for this user" });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ succsess: false, message: "User not found" });

        const courses = await Course.find({ _id: { $in: courseIds } });
        if (courses.length !== courseIds.length) {
            return res.status(404).json({ succsess: false, message: "A course in this order no longer exists" });
        }

        await Promise.all(courses.flatMap((course) => [
            Course.updateOne({ _id: course._id }, { $addToSet: { studentEnrolled: user._id } }),
            CourseProgress.updateOne(
                { courseid: course._id, userid: user._id },
                { $setOnInsert: { courseid: course._id, userid: user._id } },
                { upsert: true }
            ),
        ]));
        await User.updateOne({ _id: user._id }, { $addToSet: { courses: { $each: courseIds } } });

        // Enrollment must not fail just because a non-critical confirmation email fails.
        Promise.all(courses.map((course) => mailsender(
            user.email,
            "Course enrollment confirmed",
            `You are enrolled in ${course.courseName}.`
        ))).catch((error) => console.error("Enrollment email failed", error.message));

        return res.status(200).json({ succsess: true, message: "Payment verified and courses enrolled" });
    } catch (error) {
        console.error("Payment verification failed", error);
        return res.status(500).json({ succsess: false, message: "Unable to verify payment" });
    }
};
