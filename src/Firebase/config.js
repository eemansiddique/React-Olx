 import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase';
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAr2UKXMUIGfp78L3bCnsjWQXFp-_ypK1k",
  authDomain: "olx-auth-c46de.firebaseapp.com",
  projectId: "olx-auth-c46de",
  storageBucket: "olx-auth-c46de.appspot.com",
  messagingSenderId: "282436954712",
  appId: "1:282436954712:web:4de0c21499b3aa749a782d",
  measurementId: "G-WZFWF9DSYH"
};

  export default firebase.initializeApp(firebaseConfig);