const express = require('express')
const passport = require('passport')

const router = express.Router()
const eventController = require('../controllers/event')

router.post('/addEvent', eventController.addEvent)

router.post('/delete', eventController.delete)

router.get('/events', passport.authenticate('jwt', { session: false }), eventController.getEvents)

module.exports = router 