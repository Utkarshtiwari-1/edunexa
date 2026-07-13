const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = () => mongoose.connect(process.env.DATABASE_URL, {
    serverSelectionTimeoutMS: 10000,
});

module.exports = dbconnect;
