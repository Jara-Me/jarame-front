// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_04Y24jwTqwo29YKYJchyWfJy-PWJmDE",
  authDomain: "jarame-reloaded.firebaseapp.com",
  projectId: "jarame-reloaded",
  storageBucket: "jarame-reloaded.appspot.com",
  messagingSenderId: "535877194338",
  appId: "1:535877194338:web:c4f1d902ba29b96522373b"
};

// Initialize Firebase
// config를 통해 app 생성
const app = initializeApp(firebaseConfig);

// app에 대한 인증 서비스 사용 구너한
export const auth = getAuth(app);