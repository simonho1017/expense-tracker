const express = require('express')
const router = express.Router()
const Recoder = require('../../models/recoder')
const Category = require('../../models/category')
const User = require('../../models/user')
const passport = require('passport')
const { Passport } = require('passport')


// 引用 Todo model
// const Todo = require('../../models/todo')
// 定義首頁路由

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/', failureMessage: true,
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Success Logout')
  res.redirect('/users/login')
})


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmpassword) {
    errors.push({ 'message': 'Write eveything' })
  }
  if (password !== confirmpassword) {
    errors.push({ 'message': 'Check password again' })
  }
  if (errors.length) {
    return res.render('register', { // 再附上表單參數
      errors,
      name,
      email,
      password,
      confirmpassword
    })
  }
  User.findOne({ email }).then(user => {

    if (user) {
      errors.push({ 'message': 'User already exists.' })
      res.render('register', { // 再附上表單參數
        errors,
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