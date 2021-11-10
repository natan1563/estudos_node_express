const fs = require('fs')

if (!fs.existsSync('./minhapasta')) {
  fs.mkdirSync('minhapasta')
}

if (fs.existsSync('./minhapasta')) {
  console.log('Existe')
}
