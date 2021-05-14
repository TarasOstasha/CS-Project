var express = require('express');
var router = express.Router();
const fs = require('fs');
const pfs = fs.promises;
//import { compareAsc, format, format, formatDistance, formatRelative, subDays } from 'date-fns'
var moment = require('moment');
require("dotenv").config();
const Booking = require('../models/bookingModel');
const Transaction = require('../models/transactionModel');
//const calendar = require('../public/calendar');
//calendar();

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
      // old method
      // fs.writeFile('./emails/emailJson.txt', emailsArray, (err) => {
      //   if (err) {
      //     return console.log(err);
      //   }
      //   console.log("The file was saved!");
      // });
      res.status(200).json({
        message: 'You successfully fetched emails',
        emails: booking,
        savedEmails: emailsArray
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error'
      });
    });
});

// ***************** CALENDAR SCHEDULE APPOINTMENT **********************
router.post('/date', (req, res) => {
 
  const { date, period, cleaning_type, frequency, sq_ft, bedrooms, bathrooms, phone, first_name, last_name, city, address, state, zip_code } = req.body;
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  let hour = new Date(date).getHours();
  
  function getRandomArbitrary(min, max) { // create function random number 
    return Math.floor(Math.random() * (max - min) + min);
  }
  let myTimeObj = {
    year, month, day, hour,
    minuteStart: getRandomArbitrary(10,60),
  }

/////////////////////////////// google calendar API ||||||||||
const { google } = require('googleapis');
const { OAuth2 } = google.auth;


const oAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

oAuth2Client.setCredentials({ refresh_token: '1//04qkL3X9_IQj5CgYIARAAGAQSNwF-L9IrRVmO7WkhSbVa3ApuX44M6mUy0TGL796WYQoti61ZzL2-McfEfzr4i0aQqOetytIIa34' })

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

// start time frame *********
let startTimeFrame;
if(period == 'Morning') {
  startTimeFrame = new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, 9, myTimeObj.minuteStart);
  console.log('this is morning');
}
else if(period == 'Afternoon') {
  startTimeFrame = new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, 13, myTimeObj.minuteStart);
  console.log('this is afternoon');
}
else if(period == 'Anytime') {
  startTimeFrame = new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, 17, myTimeObj.minuteStart);
  console.log('this is evening');
}
//const morning = new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, myTimeObj.hour, myTimeObj.minuteStart); //new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, myTimeObj.hour, myTimeObj.minuteStart);   // new Date(date); thats correct
//console.log(morning, 'morning')
const eventStartTime = startTimeFrame; //moment(new Date(2021, 4, 01))
//eventStartTime.setDate(eventStartTime.getDay() + 2)

// finish time frame *********
//const evening = new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, myTimeObj.hour, myTimeObj.minuteStart);//new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, myTimeObj.hour, myTimeObj.minuteFinish);  //moment(new Date("2021, 5, 03")).hour(9).minute(1); //new Date(appropriateDate.year, appropriateDate.month, appropriateDate.day, appropriateDate.hours, appropriateDate.minutes+1); //
let finishTimeFrame;
if(period == 'Morning') {
  finishTimeFrame = new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, 9, myTimeObj.minuteStart);
  console.log('this is morning');
}
else if(period == 'Afternoon') {
  finishTimeFrame = new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, 13, myTimeObj.minuteStart);
  console.log('this is afternoon');
}
else if(period == 'Anytime') {
  finishTimeFrame = new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day, 17, myTimeObj.minuteStart);
  console.log('this is evening');
}
const eventEndTime = finishTimeFrame;//evening; //moment(new Date(2021, 4, 02))
//eventEndTime.setDate(eventEndTime.getDay() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 1) // set to 1 min long event


const calendarEvent = (freq, untilTime, interval, colorID) => {
  const myEvent = {
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
    `,
    start: {
      dateTime: eventStartTime,
      timeZone: 'America/New_York'
    },
    end: {
      dateTime: eventEndTime,
      timeZone: 'America/New_York'
    },
    "recurrence": [
      //"RRULE:FREQ=WEEKLY;UNTIL=20210528;INTERVAL=1"
      `RRULE:FREQ=${freq};UNTIL=${untilTime};INTERVAL=${interval}`
    ],
    colorId: colorID,
  }
  return myEvent
}

// for one time schedule
let bookedDateArray = new Array(new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day)); // transform booked date to array
let untilDateOneTime = bookedDateArray.map((v)=>v.toISOString().slice(0,10)).join("").split('-').join(""); 

// other time schedule
let myMonth;
let threeMonthLater;
let myDay;
let untilDateWeeklyTime;
let untilDateMonthlyTime; 
let bookedMyTime = new Date(myTimeObj.year, myTimeObj.month, myTimeObj.day); // get date booked obj
let myYear = bookedMyTime.getFullYear(); 

// update date if the next schedule appointment will be on the next year
if( bookedMyTime.getMonth() == 9 ) { 
  myYear += 1;
  myMonth = '01';
  threeMonthLater = '01';
  myDay = ("0" + myTimeObj.day).slice(-2); // get day in two digit format
  untilDateWeeklyTime = new Array(myYear, myMonth, myDay).join(""); // convert to format: YYMMDD
  untilDateMonthlyTime = new Array(myYear, threeMonthLater, myDay).join(""); // // convert to format: YYMMDD
}
else if(bookedMyTime.getMonth() == 10) {
  myYear += 1;
  myMonth = '02';
  threeMonthLater = '02';
  myDay = ("0" + myTimeObj.day).slice(-2); // get day in two digit format
  untilDateWeeklyTime = new Array(myYear, myMonth, myDay).join(""); // convert to format: YYMMDD
  untilDateMonthlyTime = new Array(myYear, threeMonthLater, myDay).join(""); // // convert to format: YYMMDD
}
else if(bookedMyTime.getMonth() == 11) {
  myYear += 1;
  myMonth = '03';
  threeMonthLater = '03';
  myDay = ("0" + myTimeObj.day).slice(-2); // get day in two digit format
  untilDateWeeklyTime = new Array(myYear, myMonth, myDay).join(""); // convert to format: YYMMDD
  untilDateMonthlyTime = new Array(myYear, threeMonthLater, myDay).join(""); // // convert to format: YYMMDD
}
else {
  myMonth = ("0" + (bookedMyTime.getMonth() + 4)).slice(-2); // get month in two digit format and set duration 3 month
  threeMonthLater = ("0" + (bookedMyTime.getMonth() + 4)).slice(-2); // get month in two digit format and set duration 3 month
  myDay = ("0" + myTimeObj.day).slice(-2); // get day in two digit format
  
  untilDateWeeklyTime = new Array(myYear, myMonth, myDay).join(""); // convert to format: YYMMDD
  untilDateMonthlyTime = new Array(myYear, threeMonthLater, myDay).join(""); // // convert to format: YYMMDD
  //console.log(untilDateWeeklyTime,untilDateWeeklyTime,myMonth,threeMonthLater,myDay)
  
}
//console.log(untilDateWeeklyTime)


let event; 
switch(frequency) {
  case 'One Time':
  event = calendarEvent('DAILY',untilDateOneTime,1,1); // booked one time
  console.log('One Time selected');
  break;
  case 'Weekly':
  event = calendarEvent('WEEKLY',untilDateWeeklyTime,1,2); // booked 4 times
  console.log('Weekly selected');
  break;
  case 'Biweekly':
  event = calendarEvent('WEEKLY',untilDateWeeklyTime,2,3); // booked 4 times
  console.log('Biweekly selected');
  break;
  case 'Monthly':
  event = calendarEvent('MONTHLY',untilDateMonthlyTime,1,4); // booked 3 times
  console.log('Monthly selected');
  break;
}

// const event = {
//   summary: `You received a new booking from ${first_name}`,
//   location: `${address}, ${city}, ${state} ${zip_code}`,
//   description: ` 
//     Option Lists 
//     Select Times - ${period}
//     Cleaning Type - ${cleaning_type}
//     Frequency - ${frequency}
//     Square Ft - ${sq_ft}
//     Bedrooms Quantity - ${bedrooms}
//     Bathrooms Quantity - ${bathrooms}
//     Contact Number is ${phone}
//   `,
//   start: {
//     dateTime: eventStartTime,
//     timeZone: 'America/New_York'
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: 'America/New_York'
//   },
//   "recurrence": [
//     "RRULE:FREQ=WEEKLY;UNTIL=20210528;INTERVAL=1"
//   ],
//   colorId: 1,
// }
let userEmail = 'crystalsystemcleaning@gmail.com'
calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'America/New_York',
      items: [{ id: 'primary' }]
    },
  },
  (err, res) => {
    //if (err) return console.error('free busy query error', err)

    const eventsArr = res.data.calendars.primary.busy

    if (eventsArr.length === 0) return calendar.events.insert({ calendarId: 'primary', resource: event }, (err) => {
      if (err) return console.error('calendar event creation error', err)
      return console.log('calendar event created')
    })
    return console.log('im busy')
  }
)
  
  ////////////////
  res.json({ ok: true, message: 'Calendar Event Created' })
})




// STRIPE
const stripe = require('stripe')('sk_test_ehdqOsyApE9vD2SR7ZJeAJ8M00ZpRuVV5y'); // test
//const stripe = require('stripe')('sk_test_51Ii2wOEAP4YefPUsr9n4cXyrZtVDTpwtCQw2jFOPdVNEB5n35WvB8ydHkhX2zHSIZH6Odq0m9NgJabszSPVOwRid00n1krxZAK');

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

const calculateOrderAmount = totalPrice => {
  return +totalPrice * 100; // need to multiply by 100, stripe count in cents
};

router.post('/payment_intents', async (req, res) => {
  try {
    // 1 step
    let { currency, totalPrice } = req.body;
    const transaction = new Transaction(req.body); 
    await transaction.save();
    // let totalPrice = 100;
    // let currency = 'USD'
    // 2 step
    const paymentIntent = await stripe.paymentIntents.create({ //token
      amount: totalPrice,
      currency
    });
    await Transaction.findOneAndUpdate({
      _id: transaction._id
    }, {
        status: 'intend (stage 2)',
        paymentIntent // paymentIntent: paymentIntent
      })
    console.log('paymentIntent', paymentIntent);
    return res.json(paymentIntent);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
// 3 step
router.post('/payment-intense-approve', async (req, res) => {
  try {
    console.log('payment-intense-approve', req.body)
    const transaction = await Transaction.findOneAndUpdate({
      "paymentIntent.id": req.body.paymentIntend_forStatus.id
    }, {
        status: 'success'
      })
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
