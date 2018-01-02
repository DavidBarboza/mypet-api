'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PetSchema = Schema({
    name: String,
    description: String, 
    year: Number, 
    image: String, 
    owner: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Pet', AnimalSchema);