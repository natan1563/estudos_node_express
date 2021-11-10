const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')
const Address = require('./models/Address')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.get('/users/create', (req, res) => {
  res.render('adduser')
})

app.post('/users/create', async (req, res) => {
  const name = req.body.name 
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  newsletter = (newsletter === 'on')

  console.log(req.body);
  
  await User.create({
    name,
    occupation,
    newsletter
  })

  res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id 
  const user = await User.findOne({
    raw: true, 
    where: { 
      id 
    }
  })

  res.render('userview', {user})
})

app.post('/users/delete/:id', async (req, res) => {
  const id = req.params.id 

  await User.destroy({where: {id}})

  res.redirect('/')
})

app.get('/users/edit/:id', async (req, res) => {
  try {
    const id = req.params.id 
    const user = await User.findOne({include: Address, where: {id}})

    res.render('useredit', {user: user.get({plain: true})})
  } catch (error) {
    console.log(error)
  }
})

app.post('/users/edit', async (req, res) => {
  const id = req.body.id 
  const name = req.body.name
  const occupation = req.body.occupation
  const newsletter = (req.body.newsletter  === 'on' )

  const userData = {
    id,
    name,
    occupation,
    newsletter
  }

  await User.update(userData, {where: {id}})

  res.redirect('/')
})

app.post('/address/create', async (req, res) => {
  const userId = req.body.userId 
  const street = req.body.street
  const number = req.body.number
  const city = req.body.city

  const dataAddress = {
    userId,
    street,
    number,
    city
  }

  await Address.create(dataAddress)

  res.redirect(`/users/edit/${userId}`)
})

app.post('/address/delete', async function (req, res) {
  const id = req.body.id 
  const userId = req.body.userId 
  console.log('UserId: ' + userId)
  await Address.destroy({where: {id}})

  res.redirect(`/users/edit/${userId}`)
})

app.get('/', async (req, res) => {
  const users = await User.findAll({ raw: true })

  console.log(users);

  res.render('home', {
    users
  })
})

conn.
sync()
// sync({force: true})
.then(() => {
  app.listen(3000)
})
.catch(err => console.log(err))