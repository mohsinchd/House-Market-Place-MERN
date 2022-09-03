import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC6wCxG33d1RZvNy-U1mtUN7Sn7mjgqC4A",
  authDomain: "imagesupload-37588.firebaseapp.com",
  projectId: "imagesupload-37588",
  storageBucket: "imagesupload-37588.appspot.com",
  messagingSenderId: "318850777479",
  appId: "1:318850777479:web:bd2b0924c833a2ac8ed322",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
