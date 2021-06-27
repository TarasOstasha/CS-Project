var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reviewRouter = require('./routes/review');

//const calendar = require('./public/calendar');

var app = express();

// ** connection to data base ** \\
//mongoose.connect('mongodb+srv://user:1111@cluster0.olmgj.mongodb.net/crystal?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }) // test data base
const mongoPass = 'crystalsys2021@';
//"mongodb+srv://olga:<password>@cluster0.m8o80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(`mongodb+srv://olga:${mongoPass}@cluster0.m8o80.mongodb.net/crystal?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(chalk.blue('Connected to database'));
    })
    .catch(() => {
        console.log(chalk.blue('Connection failed'));
    });
// ** connection to data base ** \\

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views'))); // added by Taras on May 10 2021
app.use(express.static(path.join(__dirname, 'frontEnd/dist/frontEnd')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', reviewRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// calendar
// app.use((req, res, next) => {
//   console.log('calendar')
//   calendar()
//   next()
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// render index.html from dist on real server
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;


