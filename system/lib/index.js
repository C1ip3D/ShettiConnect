import { auth} from './firebase.js';

const registerBTN = document.getElementById('register');
const pp = document.getElementById('PP');
const connect = document.getElementById('connect');
const tos = document.getElementById('TOS');
const loginBTN = document.getElementById('login');
const logOutBTN = document.getElementById('signOut');
const settingsBTN = document.getElementById('settings');
const accDropContent = document.getElementsByClassName('accDropContent')[0];

registerBTN.addEventListener('click', () => {
  window.location.href = '/dir/register.html';
});

loginBTN.addEventListener('click', () => {
  window.location.href = '/dir/login.html';
});

settingsBTN.addEventListener('click', () => {
  window.location.href = '/dir/settings.html';
});

logOutBTN.addEventListener('click', () => { 
  auth.signOut();
})

pp.addEventListener('click', () => { 
  window.location.href = '/dir/404.html';
})

tos.addEventListener('click', () => {
  window.location.href = '/dir/404.html';
})
 
connect.addEventListener('click', () => { 
  window.location.href = '/dir/main.html';
})

auth.onAuthStateChanged((user) => {
  if (user) {
    logOutBTN.style.display = 'block';
    registerBTN.style.display = 'none';
    loginBTN.style.display = 'none'; 
    settingsBTN.style.display = 'block';
	  accDropContent.style.top = '80%';
    accDropContent.style.right = '10%';
    let img = document.getElementById('pfp');
    console.log(user.photoURL);
    img.src = user.photoURL;
  } else {
    settingsBTN.style.display = 'none';
    registerBTN.style.display = 'block';
    loginBTN.style.display = 'block';
    accDropContent.style.top = '80%';
    logOutBTN.style.display = 'none';
    let img = document.getElementById('pfp');
    img.src = '/system/media/guest.jpg';
  }
});
