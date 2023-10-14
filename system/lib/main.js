import { auth, db } from './firebase.js';

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const h1 = document.querySelector('h1');
const chatMessages = document.getElementById('chatMessages');
const chatContainer = document.getElementById('chatContainer');

//Checking User Logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    h1.innerHTML += user.displayName;
  } else {
    window.location.href = 'login.html';
  }
});

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

sendButton.addEventListener('click', () => {
  if (messageInput.value !== '') {
    const data = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const time = data.toLocaleTimeString(undefined, options);
    const user = auth.currentUser;
    const messageData = {
      message: messageInput.value,
      username: user.displayName,
      pfp: user.photoURL,
      date: time,
      uid: user.uid,
    };

    db.ref('/messages').push(messageData);
    messageInput.value = '';
    messageInput.focus();
  }
});

db.ref('/messages').on('child_added', (snapshot) => {
  const data = snapshot.val();
  const message = `<div
  class="message"
  style="
    display: flex;
    gap: 10px;
    border-bottom: 1px solid bisque;
    box-shadow: 1px 1px 1px black;
    align-items: center;
    padding: 10px;
    margin: 10px;
  "
>
  <img
    src="${data.pfp}"
    alt="Profile Picture"
    style="border-radius: 50%; width: 60px; height: 60px"
    class="profile-picture"
  />
  <h3 class="username" style="font-size: 17px">${data.username}</h3></h3>

    <p class="message-text" style="font-size: larger; position: relative; left: 5%;">${data.message}</p>
    <p class="message-date" style="font-size: small; position: relative; left: 40%;">${data.date}</p>
</div>`;
  chatMessages.innerHTML += message;
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
