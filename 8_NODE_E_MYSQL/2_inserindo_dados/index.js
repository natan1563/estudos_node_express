const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title
  const pagesqty = req.body.pagesqty

  const sql = `INSERT INTO books (title, pagesqty) VALUES ('${title}', '${pagesqty}')`

  conn.query(sql, (err) => {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/')
  })
})

app.get('/',(req, res) => {
  res.render('home')
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'nodemysql'
})

conn.connect((err) => {
  if (err) {
    console.log(err)
    return;
  }

  console.log('Conectou ao Mysql!')

  app.listen(3000)
})