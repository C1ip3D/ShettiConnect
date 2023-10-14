import { auth, storage } from './firebase.js';

const form = document.querySelector('form');
const fileInput = document.getElementById('fileInput');
const dummyPassword = '123456';

fileInput.addEventListener('change', (e) => {
  let img = document.getElementById('pfpIMG');
  img.src = URL.createObjectURL(e.target.files[0]);
});

email.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === 'Tab') {
    password.focus();
  }
});

password.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === 'Tab') {
    confirmPassword.focus();
  }
});

confirmPassword.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    form.submit();
  }
});

auth.onAuthStateChanged((user) => {
  if (user) {
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 10000);
  } else {
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const fileInput = document.getElementById('fileInput');
  if (password.value != confirmPassword.value) {
    alert('Passwords do not match');
  } else if (fileInput.files.length === 0) {
    alert('Please upload a profile picture');
  } else {
    auth
      .createUserWithEmailAndPassword(
        email.value,
        password.value + dummyPassword
      )
      .then((creds) => {
        let storageRef = storage.ref(
          'pfp/' + creds.user.uid + '/profilePicture.jpg'
        );
        storageRef
          .put(fileInput.files[0])
          .then((snapshot) => {
            alert('Registered Successfully');
            storageRef.getDownloadURL().then((url) => {
              auth.currentUser
                .updateProfile({
                  photoURL: url,
                })
                .then(() => {
                  console.log('Profile Updated');
                  auth.currentUser
                    .updateProfile({
                      displayName: name.value,
                    })
                    .then(() => {})
                    .catch((error) => {
                      console.error(error);
                      alert(error.message);
                    });
                })
                .catch((error) => {
                  console.error(error);
                  alert(error.message);
                });
            });
          })
          .catch((error) => {
            alert(error.message);
            console.error(error);
          });
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  }
});
