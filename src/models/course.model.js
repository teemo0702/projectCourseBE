'use strict'

const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Course'
const COLLECTION_NAME = 'Courses'

// Declare the Schema of the Mongo model
const courseSchema = new mongoose.Schema({
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
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, courseSchema);