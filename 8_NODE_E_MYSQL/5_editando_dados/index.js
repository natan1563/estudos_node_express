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

    res.redirect('/books')
  })
})

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books'

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    const books = data 

    res.render('books', {
      books
    })
  })
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM books WHERE id = ${id}`
  
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err)
      return 
    }

    const book = data[0];
    res.render('book', {book})
  })
})

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM books WHERE id = ${id}`

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    const book = data[0]

    res.render('editbook', {book})
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