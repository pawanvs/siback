
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const { authenticator } = require('otplib');


const nodemailer = require('nodemailer')

const OTP = require("../../../models/appModels/OTP");



async function sendOTPMail(email, otp) {
  const mailOptions = {
      from: 'helpdesk.yesminds@gmail.com', // Your Email Id
      to: email,
      to: "ranganath.cse@gmail.com  ",
      subject: 'OTP Verification',
      text: `Your OTP for verification is:${otp}`
  };

  //USER="pavanm9071227065@gmail.com"
    //APP_PASSWORD="xjdd pykw psxg hhcy"
  let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'pavanm9071227065@gmail.com', // Your Email Id
          pass: 'xjdd pykw psxg hhcy' // Your Password
      },
      tls: {
              rejectUnauthorized: false // Disable certificate validation (if necessary)
          }
  });

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log('Error occurred:', error);
      } else {
          console.log('OTP Email sent successfully:', info.response);
      }
  });
}


const sendOTP = async (req, res, { userModel }) => {
    const { email } = req.body;
   
  // Check if the user already exists
  let otp = await OTP.findOne({ email });

  if (!otp) {
    const secret = authenticator.generateSecret();
    otp = new OTP({ email, secret });
    await otp.save();
  }
  console.log(otp);
  const secret = authenticator.generate(otp.secret);
 await sendOTPMail(email, secret);

  
 res.status(200).json({
    success: true,
    message : "OTP sent to your registered email address"
    
  });

};

module.exports = sendOTP;
