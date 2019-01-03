const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient
const mongoURL = 'mongodb://heroku_szpwsdc0:papf0959i5bi7dt0od3bvq751@ds253783.mlab.com:53783/heroku_szpwsdc0'
const remoteDatabaseName = 'heroku_szpwsdc0'

let messageConsumer = require('./messageConsumption')
let sampleData = require('./sampleData')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.get('/', (request, response) => {
	MongoClient.connect(mongoURL,{ useNewUrlParser: true },function(err, db) {
		if(err) { return console.dir(err); }
		let database = db.db(remoteDatabaseName)
		let collection = database.collection('messageStore')

		collection.find().toArray(function(err, items) {
			console.log('Data retrieved from store:\n', items)
			response.render('index', {messages: items})
		})
	})
})

app.post('/postMessage', function(request, response){
	let message = request.body
	messageConsumer.consumeMessage(message)
	response.end('Message Received! -\n', message)
})

app.listen(process.env.PORT || port, () => {
	console.log(`Listening on port ${port}`)
})