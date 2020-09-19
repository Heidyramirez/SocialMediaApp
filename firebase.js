import firebase from 'firebase';

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyD6NDPmOcsteoFAPxMzRU6ICQyS6N33mTI",
    authDomain: "socialmediaapp-c180e.firebaseapp.com",
    databaseURL: "https://socialmediaapp-c180e.firebaseio.com",
    projectId: "socialmediaapp-c180e",
    storageBucket: "socialmediaapp-c180e.appspot.com",
    messagingSenderId: "433731563017",
    appId: "1:433731563017:web:58316db243cb2a39e0d2d8",
    measurementId: "G-9L3QG8MR5T"
}); 

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};