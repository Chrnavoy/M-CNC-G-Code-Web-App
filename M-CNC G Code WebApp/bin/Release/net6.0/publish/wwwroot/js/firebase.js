/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
apiKey: "AIzaSyB5hXxWs83wEU75CsI7leJchG2w7cXXr6E",
authDomain: "mcncgcode.firebaseapp.com",
projectId: "mcncgcode",
storageBucket: "mcncgcode.appspot.com",
messagingSenderId: "1013610819770",
appId: "1:1013610819770:web:653a70e369bb7776ea5283",
measurementId: "G-XVY7R8TM7C"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

const querySnapshot = await getDocs(collection(firestore, "History"));
querySnapshot.forEach((doc) => {
    
    console.log(doc.id, " => ", doc.data());
});
*/