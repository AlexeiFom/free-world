const Event = require('../models/event/Event')

module.exports.addEvent = async function (req, resp) {

    console.log(req.body)

    const newEvent = new Event({
        date: req.body.date,
        text: req.body.text
    })

    newEvent.save((err, newEvent) => {
        if (err) {
            console.log(`Error : ${err}`)
        }
        else {
            console.log('Success :)')

            resp.send('Success :)')
        }
    })
}

module.exports.getEvents = async function (req, resp) {
    console.log('Getting Event')

    const events = await Event.find()

    resp.send(events)
}