const axios = require('axios')
const https = require('https')
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

const express = require('express')
const router = express.Router()

const cfgCopaBrasil = require('../../config/api.config').campeonatos.CopaDoBrasil
const cfgBrasileiro = require('../../config/api.config').campeonatos.Brasileiro

/* Copa do Brasil */
router.get('/copaBrasil', function (req, res) {
  axios.get(cfgCopaBrasil.url, {
      httpsAgent
    })
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
})

router.get('/copaBrasil/matches', function (req, res) {
  axios.get(cfgCopaBrasil.partidas, {
      httpsAgent
    })
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
})

/* Campeonato Brasileiro */
router.get('/brasileiro', function (req, res) {
  axios.get(cfgBrasileiro.url, {
      httpsAgent
    })
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
})

router.get('/brasileiro/matches', function(req, res) {
  axios.get(cfgBrasileiro.partidas, {
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