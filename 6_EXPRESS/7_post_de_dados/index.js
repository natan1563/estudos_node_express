const express = require('express')
const app = express()
const port = 8000

const path = require('path') 
const basePath = path.join(__dirname, 'templates')

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.get('/users/add', (req, res) => {
  res.sendFile(`${basePath}/userForm.html`)
})

app.post('/users/save', (req, res) => {
  const body = req.body 
  const name = body.name 
  const age = body.age 

  console.log(`O nome do user eh ${name}, e ele tem ${age} anos`)
  res.sendFile(`${basePath}/userForm.html`)
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id 

  console.log(`Estamos buscando pelo usuario: ${id}`)
  res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})