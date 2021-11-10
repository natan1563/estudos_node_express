const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

console.log(args)

const nome = args['nome']
const profissao = args['profissao']
console.log(nome)

console.log(`O nome dele eh ${nome} e a profissao dele eh ${profissao}`)
// export default minimist;