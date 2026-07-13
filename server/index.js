const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();

if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
    throw new Error("DATABASE_URL and JWT_SECRET must be configured");
}

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(cookieparser());
// app.use(cors({
//     origin(origin, callback) {
//         // Requests without an Origin header include health checks and server-to-server calls.
//         if (!origin || allowedOrigins.includes(origin)) {
//             return callback(null, true);
//         }
//         const error = new Error("Origin is not allowed by CORS");
//         error.status = 403;
//         return callback(error);
//     },
//     credentials: true,
// }));

app.use(cors({
    origin:"*",
    credentials:true,
}));

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
    limits: { fileSize: 100 * 1024 * 1024 },
    abortOnLimit: true,
}));

const dbconnect = require("./config/database");

const connectCloudinary = require("./config/Cloudinary");
connectCloudinary();


const PORT = process.env.PORT || 4000;


const courserouter = require("./routes/Course");
const  paymentrouter = require("./routes/Payment");
const profilerouter = require("./routes/Profile");
const userrouter = require("./routes/User");

app.use("/api/v1/courses",courserouter);
app.use("/api/v1/payments",paymentrouter);
app.use("/api/v1/profile",profilerouter);
app.use("/api/v1/user",userrouter);

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"StudyNotion API is running",
    })
})

app.get("/health", (req, res) => {
    const mongoose = require("mongoose");
    const ready = mongoose.connection.readyState === 1;
    res.status(ready ? 200 : 503).json({ success: ready, database: ready ? "connected" : "disconnected" });
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
});

dbconnect()
    .then(() => app.listen(PORT, () => console.log(`API listening on port ${PORT}`)))
    .catch((error) => {
        console.error("Database connection failed", error);
        process.exit(1);
    });
