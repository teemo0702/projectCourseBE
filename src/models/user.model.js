'use strict'

const mongoose = require('mongoose')

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    userName: {
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type:String,
        required:true,
    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);