const MongoClient = require('mongodb').MongoClient
const mongoURL = 'mongodb://heroku_szpwsdc0:papf0959i5bi7dt0od3bvq751@ds253783.mlab.com:53783/heroku_szpwsdc0'
const remoteDatabaseName = 'heroku_szpwsdc0'

function consumeMessage(message){
  MongoClient.connect(mongoURL,{ useNewUrlParser: true },function(err, db) {
    if(!err) {
      console.log("Consumer connecteded to DB")
    }

    let database = db.db(remoteDatabaseName)
    let collection = database.collection('messageStore')
    collection.insertOne(message) // Insert message
  })
  return
}

module.exports.consumeMessage = consumeMessage