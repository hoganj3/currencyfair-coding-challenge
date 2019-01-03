# CurrencyFair Coding Challenge

Jason Hogan

I implemented a solution to this coding challenge using JavaScript and Node.js.

The web service is exposed using Express.js and hosted on Heroku. A remote MongoDB database (also hosted on Heroku) is used to store messages.

`app.js` initialises the app and defines the protocols for responding to `GET` and `POST` requests. `server.js` starts the web service.

`messageConsumer.js` is where new messages are consumed and added to the database.

Pug was used as a view template to dynamically generate HTML with the given message data. `index.pug` contains the template for listing messages that have been retrieved from the database, and displaying them in a bar chart.

The frontend of the web service is hosted at [https://currencyfair-coding-challenge.herokuapp.com/](https://currencyfair-coding-challenge.herokuapp.com/). The data is displayed as a readable list containing some key data from each message.

The endpoint for POSTing new messages is [https://currencyfair-coding-challenge.herokuapp.com/post-message](https://currencyfair-coding-challenge.herokuapp.com/post-message), POST requests should have a content type of `x-www-form-urlencoded` where the body contains the message in `JSON` format. 

Some simple unit tests can be run by cloning the repo and using the command `npm test`