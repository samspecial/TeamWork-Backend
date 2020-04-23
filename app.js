const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const adminRoute = require('./routes/adminRoutes');
const articleRoute = require('./routes/articlesRoutes');
const gifRoute = require('./routes/gifRoutes');

app.options('/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Teamwork API, Get Authorized by Signing Up' });
});

//Routes For Available Resources //
app.use('/api/v1', adminRoute);
app.use('/api/v1', articleRoute);
app.use('/api/v1', gifRoute);





module.exports = app;