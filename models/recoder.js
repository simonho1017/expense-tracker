const mongoose = require('mongoose')
const DateOnly = require('mongoose-dateonly')(mongoose);
const Schema = mongoose.Schema
const recoderSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  date: {
    type: DateOnly,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Recoder', recoderSchema)