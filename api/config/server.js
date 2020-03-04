const express = require('express')
const bodyParser = require('body-parser')

const server = express()
const port = require('./api.config').port
const routes = require('../src/routes/index')
const cors = require('./cors')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors)
server.use('/', routes)

server.listen(port, function() {
  console.log(`Server connected in ${port}`)
})

module.exports = server