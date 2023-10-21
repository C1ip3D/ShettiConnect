const firebaseConfig = {
  apiKey: "AIzaSyDt2kTnRiXgbiDj9jLCNB1YycMyi4bx54Q",
  authDomain: "shetticonnect-dbd72.firebaseapp.com",
  databaseURL: "https://shetticonnect-dbd72-default-rtdb.firebaseio.com",
  projectId: "shetticonnect-dbd72",
  storageBucket: "shetticonnect-dbd72.appspot.com",
  messagingSenderId: "368939776087",
  appId: "1:368939776087:web:599be5b30bbc937b500b12"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const masterDB = firebase.database().ref('/');
export const auth = firebase.auth();
export const storage = firebase.storage();

