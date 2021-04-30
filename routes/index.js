var express = require('express');
var router = express.Router();
const fs = require('fs');
const pfs = fs.promises;

const Booking = require('../models/bookingModel');

const calendar = require('../public/calendar');
calendar();

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

    // const { google } = require('googleapis');
    // const { OAuth2 } = google.auth;
    
    // const oAuth2Client = new OAuth2('996490370597-qg1if6r94dfgcikrdq2imabd747cufdd.apps.googleusercontent.com', 'upBzsDL5d9ID3W95l-LOaXnK')
    
    // oAuth2Client.setCredentials({ refresh_token: '1//04GhcZzfLIJG7CgYIARAAGAQSNwF-L9Ir3n2zg8K0ccegF6ceR9G4DxcLQ2-WtW6Nug8PIoSkF8K-eFrbpvLkPjaZ9ZwKrzUCNEE' })
    
    // const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
    
    // // time 
    // const eventStartTime = new Date()
    // eventStartTime.setDate(eventStartTime.getDay() + 2)
    
    // const eventEndTime = new Date()
    // eventEndTime.setDate(eventEndTime.getDay() + 2)
    // eventEndTime.setMinutes(eventEndTime.getMinutes() + 60)
    
    // const event = {
    //     summary: 'Meet with Natalya',
    //     location: '2nd St, Carlstadt, NJ 07072',
    //     describtion: 'Meeting with Yuliana to make permament makeup',
    //     start: {
    //         dateTime: eventStartTime,
    //         timeZone: 'America/New_York'
    //     },
    //     end: {
    //         dateTime: eventEndTime,
    //         timeZone: 'America/New_York'
    //     },
    //     colorId: 1
    // }
    
    // calendar.freebusy.query(
    //     {
    //         resource: {
    //             timeMin: eventStartTime,
    //             timeMax: eventEndTime,
    //             timeZone: 'America/New_York',
    //             items: [{ id: 'primary'}],
    //         },
    //     },
    //     (err, res) => {
    //         if(err) return console.error('free busy query error', err)
    
    //         const eventsArr = res.data.calendars.primary.busy
    
    //         if(eventsArr.length === 0) return calendar.events.insert({calendarId: 'primary', resource: event}, (err)=>{
    //             if(err) return console.error('calendar event creation error', err)
    //             return console.log('calendar event created')
    //         })
    //         return console.log('im busy')
    //     }
    // )
    ////////////////
    



//redirect all get request to index.html. Must be the last!!!!!!!!!!!!!!!
router.get('/*', async (req, res, next) => {
  console.log('726', req.user, new Date())
  const html = await pfs.readFile('frontEnd/dist/frontEnd/index.html');
  res.end(html);
  // res.redirect('/index.html');
});



module.exports = router;
