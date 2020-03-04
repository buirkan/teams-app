const express = require('express')
const champioshipsRouter = require('./champioship.routes')
const teamsRouter = require('./teams.routes')
const router = express.Router()

router.use('/champioships', champioshipsRouter)
router.use('/teams', teamsRouter)

module.exports = router