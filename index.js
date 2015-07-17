var app = require('./src/app')

app.listen(process.env.PORT || 5000, function () {
	console.log('Listening on http://localhost:%s', this.address().port)
})
