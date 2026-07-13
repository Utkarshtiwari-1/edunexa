const express = require("express");

const router = express.Router();

const {upadteProfile,deleteAccount,getAllUserDetails,updateDisplayPicture,getEnrolledCourses,instuctorDashboard} = require("../controller/Profile");
const {auth, isInstructor} = require("../middleware/Auth");
const {Messagecreation}  = require("../controller/Message");

//update profile
router.put("/updateProfile",auth,upadteProfile);
//delete account
router.delete("/deleteAccount",auth,deleteAccount);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.put("/updateDisplaypicture",auth,updateDisplayPicture);
router.get("/getAllUsers",auth,getAllUserDetails);
router.get("/getUserDetails",auth,getAllUserDetails);
router.post("/contactus",Messagecreation);
router.get("/instuctorDashboard",auth,isInstructor,instuctorDashboard);
module.exports = router;
