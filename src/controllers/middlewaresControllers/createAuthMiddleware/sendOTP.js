
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const { authenticator } = require('otplib');


const nodemailer = require('nodemailer')

const OTP = require("../../../models/appModels/OTP");



async function sendOTPMail(email, otp) {
  const mailOptions = {
      from: 'pawan.vs@gmail.com', // Your Email Id
      to: email,
      subject: 'OTP for portal login',
      text: `Dear User,

      One Time Password (OTP) to log into Portal is ${otp}
      
      Please Note:
      We will never send you an email asking for your Login Credentials. Please do not respond to any email requesting such information.
      
      Disclaimer: The information in this email is intended solely for the recipient and may be privileged and confidential. If you receive it in error, please notify the sender immediately and delete the message. Unauthorized use, disclosure, or copying of this email is prohibited. Beware of online banking fraud! If you receive an email with wire instructions, always verify with escrow before transferring funds. Your diligence can prevent financial loss and protect your assets.
      `
  };

  //USER="pavanm9071227065@gmail.com"
    //APP_PASSWORD="xjdd pykw psxg hhcy"
  let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'pawan.vs@gmail.com', // Your Email Id
          pass: 'dhpl xbfs ltsa xpoe' // Your Password
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
