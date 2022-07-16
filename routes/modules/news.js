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
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, date, category, amount
  } = req.body
  const UserId = req.user._id
  Category.findOne({ name: category }).then(category => {
    Recoder.create({
      name,
      date,
      categoryId: category._id,
      amount,
      UserId
    })
      .then(() => res.redirect('/'))
  })

    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const UserId = req.user._id
  Recoder.findOne({ _id, UserId }).populate('categoryId')
    .lean()
    .then(recoder => {
      const Noselectcategory = []
      Category.find()
        .then(categories => {

          categories.filter(category => {
            if (category.name !== recoder.categoryId.name) {
              return Noselectcategory.push(category.name)
            }
          })
        })
        .then(() => res.render('edit', { recoder, Noselectcategory }))
    })
    .catch(err => console.log(err))

})

router.post('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount
  } = req.body
  Category.findOne({ name: category })
    .then(category => {
      Recoder.findOne({ _id, UserId })
        .then(recoder => {
          recoder.name = name
          recoder.date = date
          recoder.categoryId = category._id
          recoder.amount = amount
          return recoder.save()
        })
        .then(() => res.redirect('/'))
    })
    .catch(err => console.log(err))
})


router.post('/:id/delete', (req, res) => {
  const _id = req.params.id
  const UserId = req.user._id
  return Recoder.findOne({ _id, UserId })
    .then(recoder => recoder.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})


module.exports = router