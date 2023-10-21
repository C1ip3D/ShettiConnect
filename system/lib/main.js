import { auth, db, masterDB } from './firebase.js';

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const h1 = document.querySelector('h1');
const chatMessages = document.getElementById('chatMessages');
const reset = document.getElementById('reset');

reset.addEventListener('click', () => {
  masterDB.remove().then(() => {
    alert('Reset Activated')
    window.location.reload()
  }).catch((error) => {
    console.error(error)
    alert("ERROR")
  })
})

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

  const message = `    <div class="message">
  <img
  src="${data.pfp}"
  alt="Profile Picture"
  class="profile-picture"
  />
  <h3 class="username" style="font-size: 17px">${data.username}</h3></h3>
<div class="messageContainer">
  <p class="message-text" >${data.message}</p>
</div>
<p class="message-date">${data.date}</p>
</div>`;
  chatMessages.innerHTML += message;
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
