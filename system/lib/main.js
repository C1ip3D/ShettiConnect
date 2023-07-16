import { auth, db } from './firebase.js';

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const h1 = document.querySelector('h1');
const chatMessages = document.getElementById('chatMessages');
const newChat = document.querySelector('button');
const chatContainer = document.getElementById('chatContainer');
const selection = document.getElementsByClassName('selection')[0];
const chatIDInput = document.querySelector('#chatInput');
const chatIDSubmit = document.getElementById('chatSubmit');
const joinanother = document.getElementById('Join');
let chatID;

newChat.addEventListener('click', () => {
  chatID = Math.random(1, 10);
  chatID = Math.floor(chatID * 100000000);

  chatContainer.style.display = 'flex';
  selection.style.display = 'none';
  console.log(chatID);
});

chatIDInput.addEventListener('keyup', (e) => { 
  console.log(e.keyCode)
  console.log(chatIDInput.value)
})

chatIDSubmit.addEventListener('click', () => {
  if (chatIDInput.value === '') {
    console.log(chatIDInput.value)
    alert('Please enter a chat ID');
    return;
  } else {
    db.ref('messages/' + chatIDInput.value)
      .once('value')
      .then((snapshot) => {
        //For Fetching messages
        // const data = snapshot.val();
        // const keys = Object.keys(data);
        if (snapshot.exists()) {
          chatContainer.style.display = 'flex';
          selection.style.display = 'none';
          //For fetching messages before user joing (LATER)
            // if (data) {
            //   console.log(data)
            //   for (let i = 0; i < data.length; i++) {
            //     console.log(data)
            //     const childKey = keys[i];
            //     const childData = data[childKey];
            //     const message = `
            //   <div style="display:flex;align-items:center;padding:5px;border-bottom:1px solid #ccc">
            //   <img src="${auth.currentUser.photoURL}" style="width:50px;height:50px;border-radius:50%;"/>
            //     <strong style="margin-left:10px">${auth.currentUser.displayName}</strong>: ${childData.message}
            //   </div>
            //   `;

            //     chatMessages.innerHTML += message;
            //     console.log(childData.message);
            //   }
            // }
        } else {
          alert('Chat ID does not exist. Please try again.');
          chatIDInput.value = '';
          chatIDInput.focus();
          return;
        }
      });
  }
});

joinanother.addEventListener('click', () => {
  chatIDInput.value = '';
  chatIDInput.focus();
  chatContainer.style.display = 'none';
  selection.style.display = 'grid';
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    let date = new Date();
    const user = auth.currentUser;
    if (user) {
      const messageData = {
        user: user.uid,
        username: user.displayName,
        message: message,
        time: date.toLocaleString(),
      };
      db.ref('messages/' + chatID).push(messageData);
      messageInput.value = '';
      db.ref('messages')
        .once('value')
        .then((snapshot) => {
          const messages = snapshot.val();
          const keys = Object.keys(messages);
          // Handle the last child data
          const message = `
          <div style="display:flex;align-items:center;padding:5px;border-bottom:1px solid #ccc">
          <img src="${auth.currentUser.photoURL}" style="width:50px;height:50px;border-radius:50%;"/>
            <strong style="margin-left:10px">${messageData.username}</strong>: ${messageData.message}
          </div>
          `;
          chatMessages.innerHTML += message;
        })
        .catch((error) => {
          console.log('Error fetching last child:', error);
        });
    } else {
      console.log('User not logged in.');
    }
  }
});

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

auth.onAuthStateChanged((user) => {
  if (user) {
    h1.innerHTML = 'Welcome, ' + user.displayName;
  } else {
    window.location.href = '/dir/login.html';
  }
});
