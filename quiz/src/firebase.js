import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyAuk4C-f41wHfNtu1mQpznmWj3ubD42m7k",
    authDomain: "cat-quiz-c4140.firebaseapp.com",
    projectId: "cat-quiz-c4140",
    storageBucket: "cat-quiz-c4140.appspot.com",
    messagingSenderId: "661524179801",
    appId: "1:661524179801:web:1a12dfa019072ad5523a48",
    measurementId: "G-ZVYNGFXWJW"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };