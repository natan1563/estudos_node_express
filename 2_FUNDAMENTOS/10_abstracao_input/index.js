const inquirer = require('inquirer')

inquirer
.prompt([
  {
    name: 'p1',
    message: 'Qual a primeira nota?'
  },
  {
    name: 'p2',
    message: 'Qual a segunda nota?'
  }
])
.then((answres) => {
  console.log(answres)
  const media = (parseInt(answres.p1) + parseInt(answres.p2)) / 2
  console.log(`A media eh: ${media}`)
})
.catch(err => console.log(err))