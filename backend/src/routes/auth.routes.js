const express = require("express");
const router = express.Router();

const {
    requestMissedCallOtp,
    verifyOtp,
    requestSmsOtp
} = require("../controllers/auth.controller");

router.post("/missed-call", requestMissedCallOtp);
router.post("/verify-otp", verifyOtp);
router.post("/sms", requestSmsOtp);


module.exports = router;
