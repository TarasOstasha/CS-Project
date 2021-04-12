var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

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

router.post('/sendmail', (req, res) => {
    let user = req.body;
    console.log(user)
    sendMail(user, info => {
        res.status(200).json({
            info: info,
            msg: 'The Mail Has been Sent'
        });
    });
});

async function sendMail(user, callback) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'tonyjoss1990@gmail.com',
            pass: 'tonyjoss19901102@'
        }
    });
    const myMailAddress = [user.email, 'tonyjoss1990@gmail.com'];
    let mailOptions = {
        from: 'tonyjoss1990@gmail.com', // sender address
        to: myMailAddress, // list of receivers 
        subject: "New Order", // subject line
        html: `
            <h1>Company Name is ${user.company_name}</h1>
            <br>
            <h3>Client Name Is ${user.name}</h3><br>
            <p>Cellphone is ${user.phone}</p>
            <p>Email is ${user.email}</p>
            <p>Approx Sq.Ft id ${user.approx_SF}</p>
            <p>Time is ${user.time}</p>
            <p>Frequency: ${user.frequency}</p>
        `
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info)
}




module.exports = router;