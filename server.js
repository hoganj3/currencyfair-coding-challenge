const app = require('./app')
const port = 3000 // This port is only used for localhost

app.listen(process.env.PORT || port, () => {
    console.log(`Listening on port ${port}`)
})