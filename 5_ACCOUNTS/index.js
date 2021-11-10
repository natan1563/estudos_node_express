// Modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')
// Modulos internos
const fs = require('fs')

operation()

function operation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer?',
      choices: [
        'Criar conta',
        'Consultar saldo',
        'Depositar',
        'Sacar',
        'Sair'
      ]
    }
  ])
  .then(answer => {
    const action = answer.action;
    switch(true) {
      case (action == 'Criar conta'): 
        createAccount()
      break;

      case (action == 'Depositar'): 
        deposit()
      break;

      case (action == 'Consultar saldo'): 
        getAccountBalance()
      break;

      case (action == 'Sacar'): 
        withdraw()
      break;

      case (action == 'Sair'): 
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit;
      break;
    }
  })
  .catch(err => console.log(err))
}

//create an account
function createAccount() {
  console.log(chalk.bgGreen.black('Obrigado por utilizar o nosso banco!'))
  console.log(chalk.green.italic('Defina as opções da sua conta a seguir'))

  buildAccount()
}

function buildAccount() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Digite um nome para sua conta: '
    }
  ])
  .then(answer => {
    const accountName = answer.accountName;
    const accountPath = `accounts/${accountName}.json`;

    if (!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts')
    }

    if (fs.existsSync(accountPath)) {
      console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'))
      buildAccount()
      return
    }

    fs.writeFileSync(accountPath, '{"balance": 0}', (err) => {
      console.log(err)
    })

    console.log(chalk.green('Parabéns sua conta foi criada com sucesso!'))
    operation()
  })
  .catch(err => console.log(err))
}

// deposito

function deposit() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }
  ])
  .then(answer => {
    const accountName = answer.accountName

    if (!checkAccount(accountName)) {
      return deposit()
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: 'Quanto você deseja depositar'
      }
    ])
    .then(answer => {
      const amount = answer.amount

      addAmount(accountName, amount)
      operation()
    })
    .catch(err => console.log(err))
  })
  .catch(err => {
    console.log(err)
  })
}

function checkAccount(accountName) {
   if (!fs.existsSync(`accounts/${accountName}.json`)) {
     console.log(chalk.bgRed.black('Esta conta não existe, tente novamente!'))
     return false
   }
   return true
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(chalk.bgRed.black('Ocorrreu um erro, tente novamente mais tarde!'))
    return deposit()
  }
  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
  fs.writeFileSync(
    `accounts/${accountName}.json`, 
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    })
    
    console.log(chalk.green(`Um depósito de R$ ${parseFloat(amount).toFixed(2)} na sua conta`))
} 

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })

  return JSON.parse(accountJSON)
}

function getAccountBalance() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }
  ])
  .then(answer => {
    const accountName = answer.accountName

    if (!checkAccount(accountName)) {
      return getAccountBalance();
    }

    const accountData = getAccount(accountName)

    console.log(chalk.bgBlue.black(`Olá ${accountName.toUpperCase()}, o saldo da sua conta é de R$${parseFloat(accountData.balance).toFixed(2)}`))
    operation()
  })
  .catch(err => console.log(err))
}

function withdraw() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }
  ])
  .then(answer => {

    const accountName = answer.accountName

    if (!checkAccount(accountName)) {
      return withdraw();
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: 'Quanto você deseja sacar?'
      }
    ])
    .then(answer => {
      const amount = answer.amount 
      removeAmount(accountName, amount)
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
    return withdraw()
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('Valor indisponível!'));
    return withdraw()
  }
  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(`accounts/${accountName}.json`,
  JSON.stringify(accountData),
  (err) => {
    console.log(err)
  })
  console.log(chalk.green(`Foi realizado um saque de R$${parseFloat(amount).toFixed(2)} da sua conta`))
  return operation()
}