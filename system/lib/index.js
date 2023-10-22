import { auth, storage } from './firebase.js';

const registerBTN = document.getElementById('register');
const pp = document.getElementById('PP');
const connect = document.getElementById('connect');
const tos = document.getElementById('TOS');
const loginBTN = document.getElementById('login');
const logOutBTN = document.getElementById('signOut');
const settingsBTN = document.getElementById('settings');
const settings = document.getElementsByClassName('settings')[0];
const accDropContent = document.getElementsByClassName('accDropContent')[0];
const secondInput = document.getElementById('psw');
const firstInput = document.getElementById('firstInput');
const editor = document.getElementsByClassName('editor')[0];
const editTitle = document.getElementById('title');
const displayNameEDIT = document.getElementById('topEDIT');
const passwordEDIT = document.getElementById('middleEDIT');
const emailEDIT = document.getElementById('bottomEDIT');
const pfpEDIT = document.getElementById('leftEDIT');
const done = document.getElementById('done');
const cancel = document.getElementById('canceler');
const img = document.getElementById('settingsPFP');
const leftName = document.getElementById('displayName');
const rightName = document.getElementById('displayName1');
const email = document.getElementById('email');
const username = document.getElementById('username');
const NAVimg = document.getElementById('pfp');
const close = document.getElementById('close');
const emailVerifyBTN = document.getElementById('emailVerify');
const emailAlert = document.getElementsByClassName('alert')[0];

close.addEventListener('click', () => {
  settings.style.display = 'none';
});

displayNameEDIT.addEventListener('click', () => {
  editTitle.innerHTML = 'Change Username';
  secondInput.style.display = 'none';
  firstInput.placeholder = 'Enter Username';
  editor.style.display = 'block';
  done.addEventListener('click', (e) => {
    e.preventDefault();
    if (firstInput.value == '') {
      alert('Please Enter Username');
      return;
    } else {
      auth.currentUser
        .updateProfile({
          displayName: firstInput.value,
        })
        .then(() => {
          alert('Username Changed');
          leftName.innerHTML = firstInput.value;
          rightName.innerHTML = firstInput.value;
          settings.style.display = 'block';
          editor.style.display = 'none';
          firstInput.value = '';
        })
        .catch((error) => {
          alert('Error');
          console.log(error);
        });
    }
  });
});

passwordEDIT.addEventListener('click', () => {
  let promp = prompt('Are you sure? Y/N');
  if (promp == 'Y' || promp == 'Yes') {
    auth
      .sendPasswordResetEmail(auth.currentUser.email)
      .then(() => {
        alert('Email Sent');
      })
      .catch((error) => {
        alert('Error');
        console.error(error);
      });
  } else {
    return;
  }
});

emailEDIT.addEventListener('click', () => {
  if (auth.currentUser.emailVerified) {
    editTitle.innerHTML = 'Change Email';
    secondInput.style.display = 'none';
    firstInput.placeholder = 'New Email';
    editor.style.display = 'block';
    done.addEventListener('click', (e) => {
      e.preventDefault();
      if (firstInput.value === '') {
        alert('Enter a Email');
      } else {
        auth.currentUser
          .updateEmail(firstInput.value)
          .then(() => {
            alert('Email Changed');
            email.innerHTML = firstInput.value;
            editor.style.display = 'none';
            firstInput.value = '';
          })
          .catch((error) => {
            alert('Error');
            console.error(error);
          });
      }
    });
  } else {
    alert('Email Not Verified');
  }
});

emailVerifyBTN.addEventListener('click', () => {
  let lastVerification = 0;
  const now = Date.now();
  if (now - lastVerification < 3600000) {
    alert('Please wait before asking another verification');
  } else {
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        alert('Email Sent');
        window.location.reload()
      })
      .catch((error) => {
        alert('Error');
        console.error(error);
      });
      lastVerification = now;
  }
});

pfpEDIT.addEventListener('click', () => {
  editTitle.innerHTML = 'Change Profile Picture';
  firstInput.type = 'file';
  secondInput.style.display = 'none';
  editor.style.display = 'block';
  done.addEventListener('click', (e) => {
    e.preventDefault();
    let file = firstInput.files[0];
    const storageRef = storage
      .ref()
      .child('pfp/' + auth.currentUser.uid + '/profilePicture.jpg');
    storageRef
      .delete()
      .then(() => {
        storageRef
          .put(file)
          .then(() => {
            const url = storageRef.getDownloadURL();
            auth.currentUser.updateProfile({
              photoURL: url,
            });
            editor.style.display = 'none';
            NAVimg.src = url;
            img.src = url;
            alert('Profile Picture Changed');
          })
          .catch((error) => {
            alert('Error');
            console.error(error);
          });
      })
      .catch((error) => {
        alert('Error');
        console.error(error);
      });
  });
});

cancel.addEventListener('click', () => {
  editor.style.display = 'none';
  secondInput.style.display = 'block';
  firstInput.value = '';
  firstInput.placeholder = 'placeholder';
});

document.addEventListener('DOMContentLoaded', () => {
  let img = document.getElementById('pfp');
  img.src = '/system/media/guest.jpg';
});

registerBTN.addEventListener('click', () => {
  window.location.href = '/dir/register.html';
});

loginBTN.addEventListener('click', () => {
  window.location.href = '/dir/login.html';
});

settingsBTN.addEventListener('click', () => {
  settings.style.display = 'block';
});

logOutBTN.addEventListener('click', () => {
  auth.signOut();
});

pp.addEventListener('click', () => {
  window.location.href = '/dir/404.html';
});

tos.addEventListener('click', () => {
  window.location.href = '/dir/404.html';
});

connect.addEventListener('click', () => {
  window.location.href = '/dir/main.html';
});

auth.onAuthStateChanged((user) => {
  if (user) {
    logOutBTN.style.display = 'block';
    registerBTN.style.display = 'none';
    loginBTN.style.display = 'none';
    settingsBTN.style.display = 'block';
    accDropContent.style.top = '80%';
    accDropContent.style.right = '10%';
    img.src = user.photoURL;
    leftName.innerHTML = user.displayName;
    rightName.innerHTML = user.displayName;
    email.innerHTML = user.email;
    username.innerHTML = user.displayName;
    NAVimg.src = user.photoURL;
    username.textContent = 'fhsdfsdlj';
    username.textContent = '•'.repeat(username.textContent.length);
    if (auth.currentUser.emailVerified) {
      emailAlert.style.display = 'none';
    } else {
      emailAlert.style.display = 'block';
    }
  } else {
    settingsBTN.style.display = 'none';
    registerBTN.style.display = 'block';
    loginBTN.style.display = 'block';
    accDropContent.style.top = '80%';
    logOutBTN.style.display = 'none';

    img.src = '/system/media/guest.jpg';
  }
});
