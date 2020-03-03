const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./cors')

const server = express()
const port = require('./api.config').port

// middlewares
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors)

server.listen(port, function() {
  console.log(`Server connected in ${port}`)
})

module.exports = server