const nodemailer = require('nodemailer');
const asyncHandler = require("express-async-handler");
require("dotenv").config()
const ejs = require("ejs");
const path = require("path");

const sendMail = asyncHandler (async (options)=>{
    const  transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        service: process.env.SMTP_SERVICE,
        secure: false,
        auth : {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS
        },
    });

    // get the path to the email template file
    const templatePath = path.join(__dirname, "../../mails", options.template)

    // render the email template with ejs
    const html = await ejs.renderFile(templatePath, options.emailData);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        html: html
    }

    const result = await transporter.sendMail(mailOptions);
    console.log("Message Sent: ", result.messageId);
});

module.exports = sendMail;