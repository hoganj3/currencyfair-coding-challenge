const PouchDB = require('pouchdb')

function consumeMessage(message){
  let database = new PouchDB('http://localhost:3000/messageStore')
  database.put(message)
  database.info().then(function (info) {
    console.log(info)
  })
  return null
}

module.exports.consumeMessage = consumeMessage