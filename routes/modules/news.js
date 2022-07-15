// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Recoder = require('../../models/recoder')
const Category = require('../../models/category')


// 引用 Todo model
// const Todo = require('../../models/todo')
// 定義首頁路由

router.get('/', (req, res) => {
  Category.find()
  .lean()
  .then(categories =>  res.render('new',{categories}))
})

router.post('/', (req, res) => {
  const { name, date, categoryId, amount
  } = req.body
  Recoder.create({
    name, date, categoryId, amount
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  

  return Recoder.findById(id)
    .lean()
    .then(recoder => res.render('edit', { recoder }))
    .catch(err => console.log(err))

})

router.post('/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, date, categoryId, amount
  } = req.body
  return Recoder.findById(id)
    .then(recoder => {
      recoder.name = name
      recoder.date = date
      recoder.categoryId = categoryId
      recoder.amount = amount
      return recoder.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})


router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Recoder.findById(id)
    .then(recoder => recoder.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})


module.exports = router