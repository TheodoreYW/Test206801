document.addEventListener("DOMContentLoaded", function () {
  const userName = prompt("What is your name?") || "Anonymous";
  const socket = io();
  socket.emit("user joined", userName);

  const messageContainer = document.getElementById("message-container");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  sendButton.addEventListener("click", function (e) {
    e.preventDefault();
    sendMessage();
  });

  document
    .getElementById("send-container")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      sendMessage();
    });

  function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== "") {
      const messageData = { name: userName, message: message };
      socket.emit("chat message", messageData);
      messageInput.value = "";
    }
  }

  socket.on("chat message", function (msgData) {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${msgData.name}: ${msgData.message}`;

    if (msgData.name === userName) {
      messageElement.classList.add("current-user");
    } else {
      messageElement.classList.add("other-user");
    }

    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });

  socket.on("user left", function (username) {
    const leaveMessage = document.createElement("div");
    leaveMessage.textContent = `${username} left the chat`;
    messageContainer.appendChild(leaveMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });
});
