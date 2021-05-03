'use strict'
const nodemailer = require('nodemailer');

const send_email = (options) => {

    // async..await is not allowed in global scope, must use a wrapper
    const main = async () => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: options.aws.host, //SMTP host
            port: options.aws.port, // SMTP port(25, 465, 587)
            secure: false, // true for 465, false for other ports
            auth: {
                user: options.aws.user, // SMTP user
                pass: options.aws.pass, // SMTP password
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
    }
    
    main()
        .catch((err) => console.error(err))
        .finally(() => { return err ? err : "Mail enviado" });

};

exports.send_email = send_email;