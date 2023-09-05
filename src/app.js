'use strict'

require('dotenv').config()
const compression = require('compression')
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { default: helmet } = require('helmet')
const path = require('path')
const morgan = require('morgan')
const app = express()

// init middlewares
app.use('/public', express.static(path.join(__dirname, '..', 'public')))
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
    extended: true,
}))
app.use(fileUpload())
// init db
require('./dbs/init.mongodb')
// init routes
app.use('/', require('./routes'))
// handling error

module.exports = app