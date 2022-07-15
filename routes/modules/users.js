const express = require('express')
const router = express.Router()
const Recoder = require('../../models/recoder')
const Category = require('../../models/category')
const User = require('../../models/user')


// 引用 Todo model
// const Todo = require('../../models/todo')
// 定義首頁路由

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confimpassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', { // 再附上表單參數
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({ name, email, password })
    }

  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})

module.exports = router