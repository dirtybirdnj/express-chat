require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const MongoClient = require('mongodb').MongoClient

const app = express()
let db //

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let messages = []

console.log('Server is starting up')

//Show a message displaying the path & method in the console for each request the server recieves
var logRequests = function (req, res, next) {
    console.log(`${req.method} @ ${req.url}`)
    next()
}

//Tell Express to use this middleware before each of the subsequent routes defined  
app.use(logRequests)

app.use(express.static('public'))

//Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})



//Return JSON list of messages
app.get('/messages', (req, res) => {
    res.json(messages)
})

//Save a new message, don't return any JSON just redirect the user!
app.post('/messages', (req, res) => {

    req.body.createdAt = moment().toString()
    messages.push(req.body)
    res.json({})
})

MongoClient.connect(process.env.MONGO_URL,{ useNewUrlParser: true } ,(err, client) => {
  
  if (err) return console.log(err)
  
  db = client.db('express-chat') // whatever your database name is
  
  app.listen(3000, () => {
      console.log('Server is running! listening on 3000')
  })

})



