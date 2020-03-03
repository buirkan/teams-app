const apiRoute = require('../api.config').campeonatos
const https = require('https')

module.exports = function (app) {
  let copaBrasilURL = apiRoute.CopaDoBrasil.url
  let brasileiroURL = apiRoute.Brasileiro.url

  app.get('/champioships/copaBrasil', function (req, res) {
    let reqData = ''
    
    https.get(copaBrasilURL, (resp) => {
      resp.on('data', (chunk) => {
        reqData += chunk
      })

      resp.on('end', () => {
        console.log(JSON.stringify(reqData))
      })
    })
  })

  // app.get('/champioships/brasileiro', function (req, res) {

  // })
}