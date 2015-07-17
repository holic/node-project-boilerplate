if (!process.env.DATABASE_URL) {
	throw new Error('Missing DATABASE_URL environment variable.')
}

module.exports = {
	client: 'pg',
	connection: process.env.DATABASE_URL
}
