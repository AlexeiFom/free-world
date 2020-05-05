const express = require('express')
const newsRouter = require('./routes/news')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/news', newsRouter)
app.use(morgan('dev'))

app.use(cors())

module.exports = app
