const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
  {
    name: "nome",
    message: "Digite o seu nome: "
  },
  {
    name: "idade",
    message: "Digite sua idade: "
  }
])
.then((val) => {

  if (!val.nome || !val.idade)
    throw new Error("O nome e a idade sao campos obrigatorios.")

  console.log(chalk.bgYellow.black(`Ola ${val.nome}, vi aqui que voce tem ${val.idade} anos, que legal!`))
})
.catch(err => console.log(chalk.bgRed.bold(err)))