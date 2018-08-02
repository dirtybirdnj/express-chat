const express = require('express');

const app = express();

const messages = [];

console.log('Server is starting up')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    messages.push(req.body)
    res.send(messages)
})

app.listen(3000, function() {
    console.log('Server is running! listening on 3000')
})