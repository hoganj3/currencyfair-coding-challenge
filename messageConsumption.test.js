const messageConsumer = require('./messageConsumer')
const MongoClient = require('mongodb').MongoClient
const mongoURL = 'mongodb://heroku_szpwsdc0:papf0959i5bi7dt0od3bvq751@ds253783.mlab.com:53783/heroku_szpwsdc0'
const remoteDatabaseName = 'heroku_szpwsdc0'
const sampleMessage = {"userId": "3487298", "currencyFrom": "USD", "currencyTo": "EUR",
    "amountSell": 500, "amountBuy": 379.30, "rate": 0.7588,
    "timePlaced" : "3-JAN-19 9:27:36", "originatingCountry" : "US"}

test('it can handle empty messages', () => {
  expect(messageConsumer.consumeMessage(null, MongoClient, mongoURL, remoteDatabaseName)).toBe(true)
})

test('it can handle non-empty messages', async () => {
    expect.assertions(1)
    await expect(messageConsumer.consumeMessage(sampleMessage, MongoClient, mongoURL, remoteDatabaseName)).toBe(true)
})