const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('nodemvc', 'root', 'toor', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Conectado ao banco de dados')
} catch (error) {
  console.log(`Não foi possivel conectar, Erro: ${error}`)
}

module.exports = sequelize