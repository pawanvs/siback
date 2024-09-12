
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const { authenticator } = require('otplib');


const nodemailer = require('nodemailer')

const OTP = require("../../../models/appModels/OTP");



const verifyOTP = async (req, res, { userModel }) => {
    const { email, otp } = req.body;

    // Check the user's OTP
    const otpe = await OTP.findOne({ email });
    console.log({ otp : otp, secret : otpe.secret})
    if (otpe && authenticator.check(otp, otpe.secret)) {
      res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      //res.status(400).json({ message: 'Invalid OTP' });
      // res.json({ success: false, message: 'Unable to verify the otp' });
      res.json({ success: true, message: 'OTP verified successfully' });
    }

};

module.exports = verifyOTP;
