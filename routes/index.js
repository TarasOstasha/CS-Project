var express = require('express');
var router = express.Router();
const fs = require('fs');
const pfs = fs.promises;
//import { compareAsc, format, format, formatDistance, formatRelative, subDays } from 'date-fns'
var moment = require('moment');


const Booking = require('../models/bookingModel');

//const calendar = require('../public/calendar');
//calendar();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


var formatedDate = moment().format(
  "dddd, MMMM Do YYYY, h:mm:ss a");
console.log(formatedDate);


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

// booking date
router.post('/date', (req, res) => {
  const { date, period, cleaning_type, frequency, sq_ft, bedrooms, bathrooms, phone, first_name, last_name, city, address, state, zip_code, price } = req.body;
  const convertedDate = moment(date).format('lll');
  // let morning = '9:00 AM';
  // let afternoon = '1:00 PM';
  // let evening = '5:00 PM';
  console.log(convertedDate)
  ///////////////////////////////
  const { google } = require('googleapis');
  const { OAuth2 } = google.auth;

  const oAuth2Client = new OAuth2('996490370597-qg1if6r94dfgcikrdq2imabd747cufdd.apps.googleusercontent.com', 'upBzsDL5d9ID3W95l-LOaXnK')

  oAuth2Client.setCredentials({ refresh_token: '1//04GhcZzfLIJG7CgYIARAAGAQSNwF-L9Ir3n2zg8K0ccegF6ceR9G4DxcLQ2-WtW6Nug8PIoSkF8K-eFrbpvLkPjaZ9ZwKrzUCNEE' })

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  // time 
  const morning = moment(new Date("2021, 5, 01")).hour(9).minute(0);
  const eventStartTime = morning; //moment(new Date(2021, 4, 01))
  //eventStartTime.setDate(eventStartTime.getDay() + 2)

  const evening = moment(new Date("2021, 5, 02")).hour(9).minute(1);
  const eventEndTime = evening; //moment(new Date(2021, 4, 02))
  //eventEndTime.setDate(eventEndTime.getDay() + 2)
  //eventEndTime.setMinutes(eventEndTime.getMinutes() + 60)

  const event = {
    summary: `You received a new booking from ${first_name}`,
    location: `${address}, ${city}, ${state} ${zip_code}`,
    description: ` 
      Option Lists 
      Select Times - ${period}
      Cleaning Type - ${cleaning_type}
      Frequency - ${frequency}
      Square Ft - ${sq_ft}
      Bedrooms Quantity - ${bedrooms}
      Bathrooms Quantity - ${bathrooms}
      Contact Number is ${phone}
      Total Price is ${price.total}
      Recommended working hours is ${price.recommendTime}
    `,
    start: {
      dateTime: eventStartTime,
      timeZone: 'America/New_York'
    },
    end: {
      dateTime: eventEndTime,
      timeZone: 'America/New_York'
    },
    colorId: 1
  }

  calendar.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'America/New_York',
        items: [{ id: 'primary' }],
      },
    },
    (err, res) => {
      if (err) return console.error('free busy query error', err)

      const eventsArr = res.data.calendars.primary.busy

      if (eventsArr.length === 0) return calendar.events.insert({ calendarId: 'primary', resource: event }, (err) => {
        if (err) return console.error('calendar event creation error', err)
        return console.log('calendar event created')
      })
      return console.log('im busy')
    }
  )
  ////////////////
})




// STRIPE
const stripe = require('stripe')('sk_test_51Ii2wOEAP4YefPUsr9n4cXyrZtVDTpwtCQw2jFOPdVNEB5n35WvB8ydHkhX2zHSIZH6Odq0m9NgJabszSPVOwRid00n1krxZAK');

// router.post('/stripe/payment', (req, res) => {
//   console.log(req.body, 'request body stripe')
//   stripe.charges.create({
//     amount: req.body.amount,
//     currency: 'USD',
//     description: 'One time setup fee',
//     source: req.body.token.id
//   }, (err, charge)=>{
//     if(err) {
//       next(err)
//     }
//     res.json({ success: true, status: 'Payment Successfull' })
//   })
//   console.log(req.body)
// })



router.post('/payment_intents', async (req, res) => {
  try {
    // 1 step
    // let { currency, totalPrice } = req.body;
    // const transaction = new Transaction(req.body);
    // await transaction.save();
    let totalPrice = 100;
    let currency = 'USD'
    // 2 step
    const paymentIntent = await stripe.paymentIntents.create({ //token
      amount: totalPrice,
      currency
    });
    // await Transaction.findOneAndUpdate({
    //   _id: transaction._id
    // }, {
    //     status: 'intend (stage 2)',
    //     paymentIntent // paymentIntent: paymentIntent
    //   })
    //console.log('paymentIntent', paymentIntent);
    return res.json(paymentIntent);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
// 3 step
router.post('/payment-intense-approve', async (req, res) => {
  try {
    //console.log('payment-intense-approve', req.body)
    // const transaction = await Transaction.findOneAndUpdate({
    //   "paymentIntent.id": req.body.paymentIntend_forStatus.id
    // }, {
    //     status: 'success'
    //   })
    // mailer.send('tdeveloper241@gmail.com', transaction.customerEmail, 'MEGASHOP: Your order has been submitted',
    //   `
    //   <p>Your Price is ${transaction.totalPrice}</p>
    //   <p>Product name is ${transaction.productName}</p>
    // `)
    res.json({
      ok: true,
      message: 'Transaction Success'
    });
    //console.log(transaction, 'stage 3!!!!')
  } catch (error) {
    console.log(error)
  }
})






//redirect all get request to index.html. Must be the last!!!!!!!!!!!!!!!
router.get('/*', async (req, res, next) => {
  console.log('726', req.user, new Date())
  const html = await pfs.readFile('frontEnd/dist/frontEnd/index.html');
  res.end(html);
  // res.redirect('/index.html');
});



module.exports = router;
