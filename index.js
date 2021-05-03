'use strict'
const nodemailer = require('nodemailer');

const send_email = (options) => {

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: options.aws.host,
            port: options.aws.port,
            secure: false, // true for 465, false for other ports
            auth: {
                user: options.aws.user, // generated ethereal user
                pass: options.aws.pass, // generated ethereal password
            },
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: options.email.from, // sender address
            to: options.email.to, // list of receivers
            subject: options.email.subject, // Subject line
            text: options.email.text, // plain text body
            html: options.email.html, // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);

    return "Mail enviado";
};

exports.send_email = send_email;