import { initializeApp } from "firebase/app"; // create an app instance based off of some type of config
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Is used to identify this SDK (Developer Kit that we're using)
const firebaseConfig = {
  apiKey: "AIzaSyBvCOYFzpfccqJdYQAuerlT3AhqYfxOEYg",
  authDomain: "react-shopping-f6be3.firebaseapp.com",
  projectId: "react-shopping-f6be3",
  storageBucket: "react-shopping-f6be3.appspot.com",
  messagingSenderId: "489257229893",
  appId: "1:489257229893:web:31cda60f74fd487d85cd2c",
  measurementId: "G-3KE622YRRZ",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); // Return a Provider instance

// It'll take some kinds of config object for GoogleAuthProvider to behave in different ways.
provider.setCustomParameters({
  prompt: "select_account", // Always select an acc every time sb interacts with our provider
});

export const auth = getAuth(); // The auth instance that we've generated
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
