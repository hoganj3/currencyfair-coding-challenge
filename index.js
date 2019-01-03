const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const mongoURL = 'mongodb://heroku_szpwsdc0:papf0959i5bi7dt0od3bvq751@ds253783.mlab.com:53783/heroku_szpwsdc0'
const remoteDatabaseName = 'heroku_szpwsdc0'
let messageConsumer = require('./messageConsumption')
let sampleData = require('./sampleData')

app.use("/", express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

const MongoClient = require('mongodb').MongoClient
// MongoClient.connect(mongoURL,{ useNewUrlParser: true },function(err, db) {
// 		if(!err) {
// 			console.log("Consumer connecteded to DB")
// 		}
// 		let database = db.db(remoteDatabaseName)
// 		// Try to create a collection in the DB, creation ignored if collection already exists
// 		database.createCollection('messageStore', function(err, collection) {
// 			if(!err) {
// 				console.log("Created collection")
// 			}
// 			collection.insertOne(sampleData) // Insert message
// 		})
// 	})

// mongodb://heroku_szpwsdc0:papf0959i5bi7dt0od3bvq751@ds253783.mlab.com:53783/heroku_szpwsdc0


app.get('/', (req, res) => {
	MongoClient.connect(mongoURL,{ useNewUrlParser: true },function(err, db) {
		if(err) { return console.dir(err); }
		let database = db.db(remoteDatabaseName)
		let collection = database.collection('messageStore')

		collection.find().toArray(function(err, items) {
			console.log('Data retrieved from store:\n', items)
			res.render('index', {messages: items})
		})
	})
})

app.post('/messageInput', function(request, response){
	let message = request.body
	messageConsumer.consumeMessage(message)
	response.end('ok')
})

app.listen(process.env.PORT || port, () => {
	console.log(`Listening on port ${port}`)
})