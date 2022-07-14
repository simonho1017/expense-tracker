// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Recoder = require('../../models/recoder')
// 引用 Todo model
// const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {
  // res.render('index')


  Recoder.find()
    .lean()
    .then(function (recoders) {
      let sum = Number("")
      console.log(recoders)
      for (let i = 0; i < recoders.length; i++) {
        sum += Number(recoders[i].amount)
      }
      // let sum = ""
      // sum = Number(recoders[1].amount) + Number(recoders[0].amount) 
      res.render('index', { recoders, sum })
    })
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router