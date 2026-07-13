const mongoose = require("mongoose");

const subsectionschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    timeDuration:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    videourl:{
        type:String,
        required:true,
        
    }
});

module.exports = mongoose.model("SubSection",subsectionschema);