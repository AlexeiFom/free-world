const mongoose = require('mongoose')
const News = require('../models/news/News')

module.exports.news = async function (req, resp) {
    console.log('In Controller')

    const request = req.body

    const newsList = await News.find()

    console.log(request)
}