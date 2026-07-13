const mongoose = require("mongoose");

const profileschema = new mongoose.Schema({
    gender:{
        type:String,
        
    },
    DateofBirth:{
        type:String,
        
    },
    about:{
        type:String,
       
        trim:true,
    },
    phoneNumber:{
        type:Number,
       
    },
    Profession:{
        type:String,
      
    }

});

module.exports = mongoose.model("Profile",profileschema);