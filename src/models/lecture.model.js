'use strict'

const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Lecture'
const COLLECTION_NAME = 'Lectures'

// Declare the Schema of the Mongo model
const lectureSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    code:{
        type:String,
        required:true,
        unique:true,
    },
    desc:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        require:true,
    },
    courseCode:{
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, lectureSchema);