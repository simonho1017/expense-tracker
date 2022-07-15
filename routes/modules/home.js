// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Recoder = require('../../models/recoder')
const Category = require('../../models/category')
const category = require('../../models/category')

// 引用 Todo model
// const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {
  // res.render('index')

  // Recoder.find({ amount: "500" }).
  //   populate('Category').
  //   exec(function (err, story) {
  //     if (err) return handleError(err);
  //     console.log(Recoder.Category);
  //     // prints "The author is Ian Fleming"
  //   });


    Recoder.find().populate('categoryId')
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
// 匯出路由模組
module.exports = router