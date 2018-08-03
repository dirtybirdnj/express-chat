let newMessageForm = document.getElementById('newMessageForm')
let btnLoadMessages = document.getElementById('loadMessages')
let messagesDisplay = document.getElementById('messages')

let userNameInput = document.getElementById('username')
let roomInput = document.getElementById('room')
let bodyInput = document.getElementById('body')

newMessageForm.addEventListener('submit', (event) => {

  event.preventDefault()
  sendMessage()

})

btnLoadMessages.addEventListener('click', (event) => {

    getMessages()

})

function getMessages(){

  fetch('messages')
  .then(function(response) {
    return response.json()
  })
  .then(function(messagesJson) {

    displayLatestMessages(messagesJson)

  });    

}

function sendMessage(){

  let newMessagePayload = {
    username: userNameInput.value,
    body: bodyInput.value,
    room: roomInput.value
  }

  fetch( 'messages', 

    { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessagePayload)
    }
  
  ).then( response => response.json() ).then( ( response ) => {

        getMessages()
        bodyInput.value = ''

  } )

}

function displayLatestMessages(messageList){

  let newChatMessageList = messageList.map((message) => {

      return `<p><strong>${message.username}:</strong>&nbsp;${message.body}`

  })

  messagesDisplay.innerHTML = newChatMessageList.join('')

}