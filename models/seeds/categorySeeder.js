const mongoose = require('mongoose')
const Category = require('../category')
const categorylist = require('../../category.json').CATEGORY
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection



db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(categorylist)
})
