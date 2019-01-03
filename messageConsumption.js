const MongoClient = require('mongodb').MongoClient

function consumeMessage(message){
  MongoClient.connect('mongodb://heroku_szpwsdc0:papf0959i5bi7dt0od3bvq751@ds253783.mlab.com:53783/heroku_szpwsdc0',
      { useNewUrlParser: true }, function(err, database) {
    if(!err) {
      console.log("Consumer connecteded to DB")
    }

    // Try to create a collection in the DB, creation ignored if collection already exists
    database.createCollection('messageStore', function(err, collection) {
      collection.insert(message) // Insert message
    })
  })

  return null
}

module.exports.consumeMessage = consumeMessage