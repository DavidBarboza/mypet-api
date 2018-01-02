'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//middleswares body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//config headers and cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
                'Authorization, X-API-KEY, Origin, X-Rqeuested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//base routes


module.exports = app;