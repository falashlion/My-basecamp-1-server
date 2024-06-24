const express = require('express');
const env = require('dotenv').config();
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const checkAuth = require('./src/middleware/auth-check');



// create env variables for url and password
const url = process.env.MONGO_ATLAS_URL
mongoose.connect(url, {useNewUrlParser: true,
    useUnifiedTopology: true,}).then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  }).catch((error) => {
    console.error('Error connecting to MongoDB Atlas: ', error);
  });
mongoose.Promise = global.Promise;

const userRoutes = require('./src/routes/userRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const authenticationRoutes = require('./src/routes/authenticationRoutes');

app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors error resolution function
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle request and responses
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authenticationRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
