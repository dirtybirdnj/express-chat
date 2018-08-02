# express-chat
A simple chat server using Express and (eventually) MongoDB

Start the server locally with:
`npm run dev`

When running, server.js provides the following endpoints:
```
GET  @ /         - Serves index.html main page (front-end client)
GET  @ /messages - returns a JSON array of messages 
POST @ /messages - creates a new message
```
The current data model for messages is:

```
{
  body: 'Don\'t let your dreams be dreams.',
  username: 'shialebouf',
  room: 'general',
  createdAt: 'Thu Aug 02 2018 10:54:09 GMT-0400'
}
```
