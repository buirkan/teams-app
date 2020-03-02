const apiRoute = require('../api.config').campeonatos

module.exports = function (app) {
  app.get('/champioships/copaBrasil', function (req, res) {
    http.get(apiRoute, function(res) {
      res.on('end', function() {
        console.log('ok')
      })
    })
  })
}