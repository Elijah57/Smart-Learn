const nodemailer = require('nodemailer');
const asyncHandler = require("express-async-handler");


const sendMail = asyncHandler (async (req, res)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth : {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS
        },
    });

    let info = await transporter.sendMail({
        from: "Elijjah",
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
    })

    console.log("Message Sent: ", info.messageId);
    console.log("Preview Url: ", nodemailer.getTestMessageUrl(info));
});

module.exports = sendMail;