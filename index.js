import { consumeMessage } from 'messageConsumption'

const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use("/", express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
	res.render('index')
})

app.post('/messageInput', function(request, response){
	let message = request.body
	consumeMessage(message)
	response.end('ok')
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})