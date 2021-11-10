const express = require('express')
const router = express.Router()
const path = require('path') 
const basePath = path.join(__dirname, '../templates')

router.use(
  express.urlencoded({
    extended: true
  })
)

router.use(express.json())

router.get('/add', (req, res) => {
  res.sendFile(`${basePath}/userForm.html`)
})

router.post('/save', (req, res) => {
  const body = req.body 
  const name = body.name 
  const age = body.age 

  console.log(`O nome do user eh ${name}, e ele tem ${age} anos`)
  res.sendFile(`${basePath}/userForm.html`)
})

router.get('/:id', (req, res) => {
  const id = req.params.id 

  console.log(`Estamos buscando pelo usuario: ${id}`)
  res.sendFile(`${basePath}/users.html`)
})

module.exports = router