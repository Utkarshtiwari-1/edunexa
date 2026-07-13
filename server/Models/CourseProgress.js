const mongoose = require("mongoose");

const couseprogschema = new mongoose.Schema({
    courseid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }],
});

couseprogschema.index({ courseid: 1, userid: 1 }, { unique: true });

module.exports = mongoose.model("CourseProgress",couseprogschema);
