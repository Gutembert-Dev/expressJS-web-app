const express = require('express')
const router  = express.Router()
const {Shell} = require(__dirname + '/../../tools/Shell')

 
router.get('/', (req, res) => {
    const applications = Shell.showApplications()
    return res.send(applications)
})

module.exports = {
    router
}