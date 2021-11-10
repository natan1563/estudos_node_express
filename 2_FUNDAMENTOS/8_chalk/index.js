const chalk = require('chalk')

const nota = 6

switch(true) {
  case(nota >= 7): 
    console.log(chalk.green('Parabens! Voce esta aprovado!'))
    break;
  default: 
    console.log(chalk.bgRed.bold('Voce precisa fazer a prova de recuperacao'))
}