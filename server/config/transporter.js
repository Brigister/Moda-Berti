const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

module.exports = transporter;