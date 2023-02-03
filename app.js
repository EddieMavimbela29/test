require('dotenv').config();
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const path = require('path');
const ejsMate = require('ejs-mate');
//requiring routes
const indexRoutes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public/'));
//session
app.use(
    require('express-session')({
        secret: 'this is my 6th fullstack',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(function(req, res, next) {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

//routes
app.use('/', indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`The Server Has Started! at port${process.env.PORT}`);
});