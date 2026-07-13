const Course = require("../Models/Course");

exports.ownsCourse = async (req, res, next) => {
    try {
        const courseId = req.body.courseid || req.body.courseId;
        if (!courseId) {
            return res.status(400).json({ sucsess: false, message: "Course ID is required" });
        }
        const course = await Course.findOne({ _id: courseId, instuctor: req.user.id }).select("_id");
        if (!course) {
            return res.status(403).json({ sucsess: false, message: "You do not have access to this course" });
        }
        next();
    } catch (error) {
        return res.status(400).json({ sucsess: false, message: "Invalid course ID" });
    }
};
