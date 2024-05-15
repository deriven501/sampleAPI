let express = require("express")
let StudentRouter = express.Router({})

StudentRouter.get('/', function (req, res) {
    res.send('Hello Student')
})

module.exports = StudentRouter