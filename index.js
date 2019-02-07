const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('./config');

const port = process.env.PORT || 5000;
const app = express();

// db
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true,  useFindAndModify: false});

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// cors
app.use(cors((req, callback) => {
    callback(null, {
        origin: req.get('origin') == config.CORS_ORIGIN ? config.CORS_ORIGIN : '*',
        credentials: req.get('origin') == config.CORS_ORIGIN ? true : false,
        allowedHeaders: ['Content-Type', 'Access-Token', 'Expiry'],
        exposedHeaders: ['Access-Token', 'Expiry'] 
    });
}));

app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: config.COOKIE_SECURE, maxAge: 24 * 60 * 60 * 1000},
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}));

// api
require('./api')(app);

app.listen(port);