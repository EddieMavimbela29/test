const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

// SHOW -  HOMEPAGE 
router.get('/', (req, res) => {
    res.render('home')
});

// POST - CONTACT
router.post('/contact', (req, res) => {

    // email, subject, text
    let { email, subject, text } = req.body;
    email = req.sanitize(email);
    subject = req.sanitize(subject);
    text = req.sanitize(text);


    const auth = {
        auth: {
            api_key: process.env.API_KEY || 'MAIL_GUN_API_KEY',
            domain: process.env.DOMAIN || 'MAIL_GUN_DOMAIN'
        }
    };

    const transporter = nodemailer.createTransport(mailGun(auth));

    const mailOptions = {
        from: email,
        to: 'mkholowthandow@gmail.com',
        subject: subject,
        text: text,
        html: `
        <p>${text}</p>
        `
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log(err);
            return req.flash('error', 'Internal Error');
        }
        console.log(data);
        req.flash('success', 'Email sent eDDy!!!!!');
        res.redirect('/')
    });

});


module.exports = router;