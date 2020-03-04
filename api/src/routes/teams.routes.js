const axios = require('axios')
const https = require('https')
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

const express = require('express')
const router = express.Router()

const cfgCopaBrasil = require('../../config/api.config').campeonatos.CopaDoBrasil
const cfgBrasileiro = require('../../config/api.config').campeonatos.Brasileiro

router.get('/copaBrasil', function (req, res) {
  axios.get(cfgCopaBrasil.equipes, {
      httpsAgent
    })
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
})

router.get('/brasileiro', function (req, res) {
  console.log('GET on /brasileiro')
  axios.get(cfgBrasileiro.equipes, {
      httpsAgent
    })
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
})

module.exports = router