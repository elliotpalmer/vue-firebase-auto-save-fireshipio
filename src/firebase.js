import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCOf27lpIdjs93CUTYjm6_0cnC-NsxL-PA",
    authDomain: "vue-walkie-talkie-163c3.firebaseapp.com",
    databaseURL: "https://vue-walkie-talkie-163c3.firebaseio.com",
    projectId: "vue-walkie-talkie-163c3",
    storageBucket: "vue-walkie-talkie-163c3.appspot.com",
    messagingSenderId: "905061802260",
    appId: "1:905061802260:web:9bae9d21f7750a75dbe201"
});

const db = firebaseApp.firestore();

// Export the database for components to use.
export { db }
