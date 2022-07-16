// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Recoder = require('../../models/recoder')
const Category = require('../../models/category')
const category = require('../../models/category')
const recoder = require('../../models/recoder')

// 引用 Todo model
// const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {
  const UserId = req.user._id
  Recoder.find({ UserId }).populate('categoryId')
    .lean()
    .then(function (recoders) {
      let sum = Number("")
      for (let i = 0; i < recoders.length; i++) {
        sum += Number(recoders[i].amount)
      }
      res.render('index', { recoders, sum })
    })

    .catch(error => console.error(error))
})

router.get('/:number', (req, res) => {
  const UserId = req.user._id
  const number = req.params.number
  Recoder.find({
    UserId
  }).populate('categoryId')
    .lean()
    .then(function (Newrecoders) {
      const recoders = Newrecoders.filter(recoder => recoder.categoryId.id === number)
      let sum = Number("")
      for (let i = 0; i < recoders.length; i++) {
        sum += Number(recoders[i].amount)
      }
      res.render('index', { recoders, sum })
    })

    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router