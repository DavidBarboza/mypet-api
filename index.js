'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mypet', {useMongoClient:true})
        .then(() => {
            console.log('Conection succesful');
            
            app.listen(port, () => {
                console.log("Server running...")
            });
        })
        .catch(err => console.log(err));