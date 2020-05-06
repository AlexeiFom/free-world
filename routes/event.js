const express = require('express')
const router = express.Router()
const eventController =require('../controllers/event')

router.post('/addEvent', eventController.addEvent)

router.get('/events', eventController.getEvents)

module.exports = router 