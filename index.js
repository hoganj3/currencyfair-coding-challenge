// Express.js framework used to expose this Node web service
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000 // This port is only used for localhost

// Details of MongoDB Database for storing messages
const MongoClient = require('mongodb').MongoClient
const mongoURL = 'mongodb://heroku_szpwsdc0:papf0959i5bi7dt0od3bvq751@ds253783.mlab.com:53783/heroku_szpwsdc0'
const remoteDatabaseName = 'heroku_szpwsdc0'

let messageConsumer = require('./messageConsumption')

// Node's body-parser middleware used for accessing data in POST requests
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Pug HTML template engine used to render front end with message data
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

// Respond to GET requests by connecting to the database, fetching all messages that are stored there,
// and passing them to the Pug HTML view engine to display
app.get('/', (request, response) => {
	// Attempt to connect to database to access message store
	MongoClient.connect(mongoURL,{ useNewUrlParser: true },function(err, db) {
		if(err) { return console.dir(err); }

		// Get our specific database and collection hosted at the Mongo URL
		let database = db.db(remoteDatabaseName)
		let collection = database.collection('messageStore')

		// Find all entries in the messageStore collection
		collection.find().toArray(function(err, items) {
			console.log('Data retrieved from store:\n', items)
			// Pass all messages to the view engine to be rendered
			response.render('index', {messages: items})
		})
	})
})

// Respond to POST requests by parsing the message from the request body and passing it
// to the messageConsumer where it will be added to the database
app.post('/post-message', function(request, response){
	// Pull message JSON from the body of the POST request
	let message = request.body
	console.log('POST received:\n', message)

	// Pass message data and database details to messageConsumer
	messageConsumer.consumeMessage(message, MongoClient, mongoURL, remoteDatabaseName)
	response.end('Message Received!')
})

app.listen(process.env.PORT || port, () => {
	console.log(`Listening on port ${port}`)
})