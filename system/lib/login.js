import { auth } from './firebase.js';

const form = document.querySelector('form');
const dummyPassword = '123456';

auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = './dir/main.html';
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = form.email.value;
  const passwordInput = form.password.value;
  const password = passwordInput + dummyPassword;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
});
