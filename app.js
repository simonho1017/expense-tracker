const express = require('express')

const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose') // 載入 mongoose
const routes = require('./routes')

const app = express()


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use(routes)

// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})



// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})