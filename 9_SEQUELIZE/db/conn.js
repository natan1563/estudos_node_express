const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('node_sequelize', 'root', 'toor', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Conectamos com sucesso com o Sequelize!')
} catch(err) {
  console.log('Não foi possível conectar', err);
}

module.exports = sequelize