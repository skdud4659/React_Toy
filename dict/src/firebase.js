//firebase.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyCB78b6BocKLc9iKXE4aRJXloI1UVvlebs",
    authDomain: "catdictionary-ef30c.firebaseapp.com",
    projectId: "catdictionary-ef30c",
    storageBucket: "catdictionary-ef30c.appspot.com",
    messagingSenderId: "986655302939",
    appId: "1:986655302939:web:06c534bc11f16ccffedfbe",
    measurementId: "G-48CFHQD6ZL"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore }