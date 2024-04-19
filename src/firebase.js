import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-Y94kwm456FCHBJVRtJd74Os2cqVv3bc",
  authDomain: "tomato-game-8f398.firebaseapp.com",
  projectId: "tomato-game-8f398",
  storageBucket: "tomato-game-8f398.appspot.com",
  messagingSenderId: "532958829152",
  appId: "1:532958829152:web:9f7c8f5299a9e384c78105"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export initialized Firebase instance
export default firebaseApp;
