// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Recoder = require('../../models/recoder')
// 引用 Todo model
// const Todo = require('../../models/todo')
// 定義首頁路由

router.get('/', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, date, category, amount
  } = req.body
  console.log(category)
  Recoder.create({
    name, date, category, amount
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})



module.exports = router