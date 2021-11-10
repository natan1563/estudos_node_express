const express = require('express')
const router = express.Router()
const path = require('path')
const basePath = path.join(__dirname, '../template')

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/admin.html`)
})

module.exports = router