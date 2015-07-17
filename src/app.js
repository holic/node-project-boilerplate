var express = require('express')
var swig = require('swig')

var app = express()


// no favicon for now
app.get('/favicon.ico', function (req, res, next) {
	res.status(404).end()
})

app.use(express.static(__dirname + '/../public'))



app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

if (app.get('env') === 'development') {
	app.set('view cache', false)
	swig.setDefaults({ cache: false })
}



if (app.get('env') === 'production') {
	app.locals.isProduction = true

	app.set('trust proxy', [
		// Heroku local network
		'loopback', 'linklocal', 'uniquelocal',
		// Cloudflare IPv4
		'199.27.128.0/21', '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22', '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20', '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/12',
		// Cloudflare IPv6
		'2400:cb00::/32', '2606:4700::/32', '2803:f800::/32', '2405:b500::/32', '2405:8100::/32'
	])

	// redirect to secure, non-www URL
	var WWW_RE = /^www\./i
	app.use(function (req, res, next) {
		var redirect = !req.secure
		var host = req.get('Host')

		if (WWW_RE.test(host)) {
			host = host.replace(WWW_RE, '')
			redirect = true
		}

		redirect
			? res.redirect(301, 'https://' + host + req.originalUrl)
			: next()
	})
}


// attach routes
app.use(require('./routes'))


module.exports = app
