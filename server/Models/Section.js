const mongoose = require("mongoose");

const sectionschema = new mongoose.Schema({
    sectionName:{
        type:String,
        required:true,
        trim:true,
    },
    subsection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection",
        }
    ]
});

module.exports = mongoose.model("Section",sectionschema);