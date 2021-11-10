const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

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