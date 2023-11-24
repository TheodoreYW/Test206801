document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
  
    const messageContainer = document.getElementById('message-container');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
  
    sendButton.addEventListener('click', function (e) {
      e.preventDefault();
      sendMessage();
    });
  
    document.getElementById('send-container').addEventListener('submit', function (e) {
      e.preventDefault();
      sendMessage();
    });
  
    function sendMessage() {
      const message = messageInput.value;
      if (message.trim() !== '') {
        socket.emit('chat message', message);
        messageInput.value = '';
      }
    }
  
    socket.on('chat message', function (msg) {
      const messageElement = document.createElement('div');
      messageElement.textContent = msg;
      messageContainer.appendChild(messageElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    });
  
    socket.on('user joined', function (username) {
      const joinMessage = document.createElement('div');
      joinMessage.textContent = `${username} joined the chat`;
      messageContainer.appendChild(joinMessage);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    });
  
    socket.on('user left', function (username) {
      const leaveMessage = document.createElement('div');
      leaveMessage.textContent = `${username} left the chat`;
      messageContainer.appendChild(leaveMessage);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    });
  });
  