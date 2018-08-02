const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let messages = [];

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
    
    //This does not convert to JSON!
    //res.send(messages)

    res.json(messages)
})

//Save a new message, don't return any JSON just redirect the user!
app.post('/messages', (req, res) => {

    req.body.createdAt = moment().toString()

    messages.push(req.body)
    
    //Send the current "state" of the application back
    //res.send(messages)

    //Redirect the user back to the homepage
    //res.redirect('/')

    //Respond to client with an "empty" response of 200
    //"Things worked, but I have nothing to tell you other than that things worked"
    //res.send()

    //APPARENTLY... doing the means that the client gets unparseable JSON, oops!
    res.json({})
})


app.listen(3000, function() {
    console.log('Server is running! listening on 3000')
})

