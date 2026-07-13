const express = require("express");
const router = express.Router();

const {signUp,login,changepassword,sendOtp} = require("../controller/auth");
const {auth} = require("../middleware/Auth");
const {resetpasswordToken,resetpassword} = require("../controller/Reset");


//signup
router.post("/signup",signUp);
//login
router.post("/login",login);

//sendotp
router.post("/sendotp",sendOtp);

router.post("/changePassword",auth,changepassword);


//for reset password
router.post("/resetpassword-token",resetpasswordToken);

router.post("/resetpassword",resetpassword);

module.exports = router;
