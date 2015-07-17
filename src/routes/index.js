var express = require('express')

var router = new express.Router()


router.get('/', function (req, res, next) {
	res.render('home')
})


module.exports = router
