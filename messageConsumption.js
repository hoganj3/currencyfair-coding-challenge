// Module which receives JSON message data, and details of a database to be used,
// and adds the given message to the message store in the database
function consumeMessage(message, MongoClient, dbURL, dbName){
  if(message !== null) {
    MongoClient.connect(dbURL, {useNewUrlParser: true}, function (err, db) {
      if (err) {
        return false
      }
      console.log("Consumer connecteded to DB")
      let database = db.db(dbName)
      let collection = database.collection('messageStore')
      collection.insertOne(message) // Insert message
    })
  }
  return true
}

module.exports.consumeMessage = consumeMessage