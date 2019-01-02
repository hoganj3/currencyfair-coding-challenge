const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000
const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectID

app.use("/", express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

let messageConsumer = require('./messageConsumption')

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://currencyfair-coding-challenge.herokuapp.com/store", { useNewUrlParser: true }, function (err, client) {
	if (err) {
		console.log(err)
		process.exit(1)
	}

	// Save database object from the callback for reuse.
	db = client.db()
	console.log('Database connection ready')
	var server = app.listen(process.env.PORT || port, function () {
		var thisPort = server.address().port
		console.log('App now running on port', thisPort)
	})
})

app.get('/', (req, res) => {
	res.render('index')
})

app.post('/messageInput', function(request, response){
	let message = request.body
	messageConsumer.consumeMessage(message)
	response.end('ok')
})


app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})