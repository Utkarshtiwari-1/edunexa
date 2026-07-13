const express = require("express");

const router = express.Router();

const {capturePayment,verifySignature} = require("../controller/Payments");
const {auth,isStudent} = require("../middleware/Auth");

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifySignature",auth,isStudent,verifySignature);

module.exports = router;

