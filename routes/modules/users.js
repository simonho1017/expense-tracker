const express = require('express')
const router = express.Router()
const Recoder = require('../../models/recoder')
const Category = require('../../models/category')


// 引用 Todo model
// const Todo = require('../../models/todo')
// 定義首頁路由

router.get('/login', (req, res) => {
  res.render('login')
})


module.exports = router