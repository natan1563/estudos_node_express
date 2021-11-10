const express = require('express')
const app = express()
const path = require('path')
const basePath = path.join(__dirname, './template')
const port = 5000
const admin = require('./admin')

app.use(express.static('./public'))

app.use('/admin', admin)

app.get('/', (req, res) => {
  console.log('estou no index')
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
}) 