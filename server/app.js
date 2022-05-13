const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const stripe = require('stripe')('sk_test_51Kuq8gIOybkenklOAwgyQPPcTLU9kGA8Log8YwQ7e5yVl82ZCp0HmWrc0LgMYmF1GjmXnPXnIn0whJVIRlwbrECr00KrC45TLn')
module.exports = app

const envVariables = process.env

const {STRIPE_SECRET_KEY} = envVariables

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

//stripe