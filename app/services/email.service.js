const nodemailer = require('nodemailer');
const { getVerificationEmailTemplate } = require('../notifications/email-templates/verificationEmailTemplate');
const { resetPasswordEmailTemplate } = require('../notifications/email-templates/resetPasswordEmailTemplate')


const SITE_EMAIL=process.env.SITE_EMAIL
const SITE_EMAIL_PASSWORD=process.env.SITE_EMAIL_PASSWORD
// Create a transporter
let transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like Yahoo, Outlook, etc.
  auth: {
    user: SITE_EMAIL,
    pass: SITE_EMAIL_PASSWORD
  },
});

// Verification link function
function sendVerificationEmail(userEmail, verificationToken) {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
  const emailTemplate = getVerificationEmailTemplate(userEmail, verificationLink);

  // Email options
  const mailOptions = {
    from: 'Resume Link Support Team" <support@resumelink.site>',
    to: userEmail,
    subject: 'Email Verification',
    html: emailTemplate
  };

  // Send email
  return new Promise((resolve, reject)=>{
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      console.log('Email sent: ' + info.response);
      resolve(info.response);
    });
  })
}

// Verification link function
function sendResetPasswordEmail(userEmail, verificationToken) {
  const verificationLink = `${process.env.FRONTEND_URL}/reset-password?token=${verificationToken}`;
  const emailTemplate = resetPasswordEmailTemplate(userEmail, verificationLink);

  // Email options
  const mailOptions = {
    from: 'Resume Link Support Team" <support@resumelink.site>',
    to: userEmail,
    subject: 'Reset Password',
    html: emailTemplate
  };

  // Send email
  return new Promise((resolve, reject)=>{
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      console.log('Email sent: ' + info.response);
      resolve(info.response);
    });
  })
}


function sendAutomatedEmail(email, name) {
  

  // Email options
  const mailOptions = {
    from: 'help@resumelink.link',
    to: email,
    subject: 'Email Verification',
    html:  `<h2>Hi ${name}, Happy birthday to you</h2>`
  };

  console.log('sending mail')

  // Send email
  return new Promise((resolve, reject)=>{
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      console.log('Email sent: ' + info.response);
      resolve(info.response);
    });
  })
}

function notifyAdminSignup(email) {
  

  // Email options
  const mailOptions = {
    from: 'Resume Link Support Team" <support@resumelink.site>',
    to: SITE_EMAIL,
    subject: 'User Registration',
    html:  `<h2>Hi ${email}, Just signed up on resumelink</h2>`
  };

  console.log('sending mail')

  // Send email
  return new Promise((resolve, reject)=>{
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      console.log('Email sent: ' + info.response);
      resolve(info.response);
    });
  })
}

function sendUserDownloadedResume(email) {
  
  // Email options
  const mailOptions = {
    from: 'Resume Link Support Team" <support@resumelink.site>',
    to: SITE_EMAIL,
    subject: 'User Downloaded Resume',
    html:  `<h2>Hi ${email}, Just downloaded a resume </h2>`
  };

  // Send email
  return new Promise((resolve, reject)=>{
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      console.log('Email sent: ' + info.response);
      resolve(info.response);
    });
  })
}


module.exports = { 
  sendVerificationEmail, 
  sendResetPasswordEmail,
  sendAutomatedEmail, 
  notifyAdminSignup, 
  sendUserDownloadedResume,
 };
