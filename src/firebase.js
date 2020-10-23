import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyALG7dNB_kVeHnezH9pi3l1Ul8al_2CJSE",
    authDomain: "login-f8cb3.firebaseapp.com",
    databaseURL: "https://login-f8cb3.firebaseio.com",
    projectId: "login-f8cb3",
    storageBucket: "login-f8cb3.appspot.com",
    messagingSenderId: "883648203402",
    appId: "1:883648203402:web:5d7ada7c4b62f3aa9cfb73",
    measurementId: "G-D6P8VXCYQF"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };