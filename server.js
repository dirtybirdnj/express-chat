require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const MongoClient = require('mongodb').MongoClient

const app = express()
let db

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

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
    
    db.collection('messages').find().toArray((err, messages) => {
      
      if (err) return console.log(err)
      res.json(messages)

    })

})

//Save a new message, don't return any JSON just redirect the user!
app.post('/messages', (req, res) => {

  //Add anything additional to the message that we don't want to allow the user to dictate
  req.body.createdAt = moment().toString()
  
  db.collection('messages').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.json({})

  })

})

MongoClient.connect(process.env.MONGO_URL,{ useNewUrlParser: true } ,(err, client) => {
  
  if (err){
    console.log('Error connecting to MongoDB!')
    return console.log(err)
  } 
  
  db = client.db('express-chat') // whatever your database name is
  
  app.listen(3000, () => {
      console.log('Server is running! listening on 3000')
  })

})



