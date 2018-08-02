let newMessageForm = document.getElementById('newMessageForm')
let btnLoadMessages = document.getElementById('loadMessages')
let messagesDisplay = document.getElementById('messages')

let userNameInput = document.getElementById('username')
let roomInput = document.getElementById('room')
let bodyInput = document.getElementById('body')

newMessageForm.addEventListener('submit', (event) => {

  
  btnLoadMessages.click()
  return false

})

btnLoadMessages.addEventListener('click', (event) => {

    fetch('messages')
    .then(function(response) {
      return response.json()
    })
    .then(function(messagesJson) {
      
      console.log(messagesJson)

      displayLatestMessages(messagesJson)
    });    


})

function displayLatestMessages(messageList){

  let newChatMessageList = messageList.map((message) => {

      return `<p><strong>${message.username}:</strong>&nbsp;${message.body}`

  })

  messagesDisplay.innerHTML = newChatMessageList.join('')

}