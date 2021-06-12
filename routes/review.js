var express = require('express');
var router = express.Router();
// const dotenv = require('dotenv');
// dotenv.config();
require("dotenv").config();
const nodemailer = require('nodemailer');
var jade = require('jade');
var renderFunc = jade.compileFile('./views/email.jade');
var renderFuncForms = jade.compileFile('./views/email-forms.jade');


const Review = require('../models/reviewModel');




/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

console.log(Date.now(), 'reviews')

router.post('/review', (req, res) => {
    const reviewData = req.body;
    console.log(reviewData, 'reviewData');
    const review = new Review({
        grade: reviewData.grade,
        name: reviewData.name,
        message: reviewData.message,
        stars: reviewData.star,
        created: req.body.created
    });
    review.save()
        .then(result => {
            res.status(201).json({
                message: 'New Review Created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error'
            });
        });
});

router.get('/review', (req, res) => {
    Review.find({})
        .then(reviews => {
            if (!reviews) {
                return res.status(401).json({
                    message: 'Not Found'
                });
            }
            res.status(200).json({
                message: 'You successfully fetched reviews',
                reviews: reviews
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error'
            });
        });
});

// router.post('/sendmail', async (req, res) => {
//     try {
//         console.log(req.body, 'contacts mail')
//         const recipient = req.body;
//         sendMail(recipient, info => {
//             console.log(`${info}`);
//             res.status(200).json({ ok: true, msg: info })
//         })
//     } catch (error) {
//         console.log(error, 'something went wrong');
//         res.json('something went wrong on server');
//     }
// });

// // nodemailer
// async function sendMail(recipient, callback) {
//     // step 1
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       // port: 587,
//       // secure: false,
//       port: 465,
//       secure: true, // use SSL
//       auth: {
//         // user: 'tdeveloper241@gmail.com',
//         // pass: 'december22@'
//         //user: process.env.EMAIL,
//         //pass: process.env.PASSWORD
//         // user: 'garbiche.bucket90@gmail.com',
//         // pass: 'ostasha19901102'
//         user: 'tonyjoss1990@gmail.com',
//         pass: 'tonyjoss19901102@'
//       }
//     })
//     // step 2 
//     let mailOptions = {
//       from: 'tonyjoss1990@gmail.com', // sender address
//       to: recipient.email, // list of receivers
//       subject: recipient.subject,
//       html: recipient.message
//     }
//     //step 3
//     // send mail with defined transports object
//     let info = await transporter.sendMail(mailOptions);
//     callback(info)

//     // another method step 3
//     // transporter.sendMail(mailoptions, function(err, data) {
//     //   if(err) console.log('Error!!!')
//     //   else console.log('Email sent!!!')
//     // })
//   }

//other forms booking
router.post('/sendmail-forms', (req, res) => {
    console.log(req.body, 'other forms');
    try {
        let user = req.body;
        sendMailForms(user, info => {
            res.status(200).json({
                info,
                msg: 'The Mail Has been Sent',
                ok: true
            });
        });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
});
async function sendMailForms(user, callback) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //587,
        secure: true, //false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, //'user@gmail.com',
            pass: process.env.PASS //'pass...'
        }
    }, (err, info) => {
        if (err) {
            throw new Error(err)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    const myMailAddress = [user.email, 'crystalsystemcleaning@gmail.com'];
    let mailOptions = {
        from: 'crystalsystemcleaning@gmail.com', // sender address
        to: myMailAddress, // list of receivers 
        subject: "New Order", // subject line
        html: renderFuncForms({
            //title: 'Express',
            company_name: user.company_name,
            client_name: user.name,
            cellphone: user.phone,
            email: user.email,
            sq_ft: user.approx_SF,
            address: user.address,
            period: user.time
        })
    }
    // send mail with defined transport object
    let info = await transporter.sendMailForms(mailOptions);
    callback(info)
}


// main booking page
router.post('/sendmail', (req, res) => {
    try {
        let user = req.body;
        //console.log(user, 'user send mailer')
        sendMail(user, info => {
            res.status(200).json({
                info,
                msg: 'The Mail Has been Sent',
                ok: true
            });
        });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }

});

async function sendMail(user, callback) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //587,
        secure: true, //false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, //'user@gmail.com',
            pass: process.env.PASS //'pass...'
        }
    }, (err, info) => {
        if (err) {
            throw new Error(err)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    const myMailAddress = [user.email, 'crystalsystemcleaning@gmail.com'];
    const myYear = user.time.substring(0, 4);
    const myMonth = user.time.substring(5, 7);
    const myDay = user.time.substring(user.time.length - 2, user.time.length);
    const usZoneTime = `${myMonth}-${myDay}-${myYear}` // us time zone mm:day:yy
    const total = parseFloat(user.price.total).toFixed(2); // round price
    console.log(usZoneTime);
    let mailOptions = {
        from: 'crystalsystemcleaning@gmail.com', // sender address
        to: myMailAddress, // list of receivers 
        subject: "New Order", // subject line
        html: renderFunc({
            //title: 'Express',
            company_name: user.company_name,
            client_name: user.name,
            cellphone: user.phone,
            email: user.email,
            sq_ft: user.sq_ft,
            time: usZoneTime, //user.time,
            period: user.period,
            frequency: user.frequency,
            cleaning_type: user.cleaning_type,
            bedrooms: user.bedrooms,
            extras: parseExtras(user.extras),
            total: total
        })
        // html: `
        //     <h1>Company Name is ${user.company_name}</h1>
        //     <br>
        //     <h3>Client Name Is ${user.name}</h3><br>
        //     <p>Cellphone is ${user.phone}</p>
        //     <p>Email is ${user.email}</p>
        //     <p>Approx Sq.Ft id ${user.approx_SF}</p>
        //     <p>Time is ${user.time}</p>
        //     <p>Frequency: ${user.frequency}</p>
        // `
    }
    // this function get exist value from exstras object
    function parseExtras(el) {
        let exstrasValue = [];
        let extrasArr = Object.values(el);
        let resultArr = extrasArr.filter(item => { return item });
        let result = resultArr.map(a => a.value);
        //console.log(resultArr, 'extrasArr');
        return result //resultArr.toString();
    }
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info)
}


/* GET home page. */
router.get('/preview', function (req, res, next) {
    res.render('email', {
        company_name: 'Apple',
        client_name: 'Jack',
        cellphone: '345980967',
        email: 'test@gmail.com',
        sq_ft: '1000',
        time: 'morning',
        frequency: 'one time'
    });
});



module.exports = router;
