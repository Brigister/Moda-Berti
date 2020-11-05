const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    auth: {
        type: process.env.NODEMAILER_TYPE,
        user: process.env.EMAIL,
        //pass: process.env.EMAIL_APP_PASSWORD,
        clientId: process.env.NODEMAILER_CLIENT,
        clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
        /*         refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN,
                expires: 3599, */
    },
});

const sendMail = (mail) => transporter.sendMail(mail, (err, info) => {
    if (err) {
        console.log(err);
        return err;
    }

    else {
        console.log(info);
        return info;
    }
});


module.exports = sendMail;