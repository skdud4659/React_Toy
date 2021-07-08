import firebase from "firebase/app";
//로그인/회원가입 auth
import "firebase/auth";
//firestore
import 'firebase/firestore';
//storage
import "firebase/storage";

const firebaseConfig = {
// 인증정보!
    apiKey: "AIzaSyB4JgLomg9KTgGpF6Bt0pKyEkdT5y2mHPY",
    authDomain: "memorable-488d8.firebaseapp.com",
    projectId: "memorable-488d8",
    storageBucket: "memorable-488d8.appspot.com",
    messagingSenderId: "154721734312",
    appId: "1:154721734312:web:26036a0ee63a5438f13c9d",
    measurementId: "G-QC1K4H24MG"
};

firebase.initializeApp(firebaseConfig);

//auth
const auth = firebase.auth();
//firestore
const firestore = firebase.firestore();
//storage
const storage = firebase.storage();

const apiKey = firebaseConfig.apiKey

export { auth, firestore, storage, apiKey };