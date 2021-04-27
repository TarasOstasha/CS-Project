var express = require('express');
var router = express.Router();
const fs = require('fs');
const pfs = fs.promises;

const Booking = require('../models/bookingModel');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});





// send booking data
router.post('/booking-data', (req, res) => {
  const bookingData = req.body;
  const booking = new Booking({
    name: bookingData.name,
    last_name: bookingData.last_name,
    address: bookingData.address,
    city: bookingData.city,
    state: bookingData.state,
    zip_code: bookingData.zip_code,
    phone: bookingData.phone,
    email: bookingData.email
  })
  booking.save()
    .then(result => {
      res.status(201).json({
        message: 'New Booking Created',
        result: result,
        ok: true
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error'
      });
    });
  console.log(req.body);
});

// get booking data
router.get('/booking-data', (req, res) => {
  Booking.find({})
    .then(booking => {
      if (!booking) {
        return res.status(401).json({
          message: 'Not Found'
        });
      }
      res.status(200).json({
        message: 'You successfully fetched booking',
        booking: booking
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error'
      });
    });
});

router.get('/emails', (req, res) => {
  Booking.find({})
    .then(booking => {
      if (!booking) {
        return res.status(401).json({
          message: 'Not Found'
        });
      }
      //console.log(booking)
      let emailsArray = [];
      for (const value of booking) {
        emailsArray.push(value.email)
      }
      //const emailJson = JSON.stringify(emailsArray);
      fs.writeFile('./emails/emailJson.txt', emailsArray, (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
      res.status(200).json({
        message: 'You successfully fetched emails',
        emails: booking
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error'
      });
    });
});



//redirect all get request to index.html. Must be the last!!!!!!!!!!!!!!!
router.get('/*', async (req, res, next) => {
  console.log('726', req.user, new Date())
  const html = await pfs.readFile('frontEnd/dist/frontEnd/index.html');
  res.end(html);
  // res.redirect('/index.html');
});



module.exports = router;
