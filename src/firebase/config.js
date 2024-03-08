import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAI-02CA2lu3K7fae6iuHDrylVq433N4YA",
    authDomain: "moneytracker-4b27a.firebaseapp.com",
    projectId: "moneytracker-4b27a",
    storageBucket: "moneytracker-4b27a.appspot.com",
    messagingSenderId: "155588841918",
    appId: "1:155588841918:web:93f36a07b0ef2a5dd1e9ef"
};


// init firebase
firebase.initializeApp(firebaseConfig)

// init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }