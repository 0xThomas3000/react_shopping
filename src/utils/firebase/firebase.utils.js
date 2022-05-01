import { initializeApp } from "firebase/app"; // create an app instance based off of some type of config
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc, // This method allows us to get a document instance inside of Firestore DB.
  getDoc, // To get that Data on that document
  setDoc, // To set the documents data
  collection,
  writeBatch, // Ensure all of objects are added to the Collection successfully (in 1 successful transaction)
  query,
  getDocs,
} from "firebase/firestore";

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

// The auth: singleton because it keeps track of the authentication state of the entire app
// as the users sign-in
export const auth = getAuth(); // The auth instance that we've generated
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

// Add a Collection and then the actual documents inside of that Collection
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field = "title"
) => {
  const collectionRef = collection(db, collectionKey);
  /*  Now we have a collectionRef, what are we gonna do next? => Batch write these objects to there
      How to store each of these "objectsToAdd" inside of "collectionRef" as a new Document?
      ===> Read more in Udemy note (126. addCollectionAndDocuments Pt.1) */
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase()); // Or "object.title.toLowerCase()"
    batch.set(docRef, object); // Set location with object value (can pass JSON obj and it'll build out the structure)
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef); // Generate a Query of a CollectionRef

  const querySnapshot = await getDocs(q); // async ability to fetch the document Snapshots

  // Reducing over array in order to end up with an object.
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc; // Return the accumulator
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // Give me a doc ref inside of 'db' under 'users' collection with this "user auth" that has a particular id
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  // if user data does not exist
  // create/set the document with the data from userAuth in my collection
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth; // pull 2 props from userAuth obj
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // if user data exists
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// async because it'll return a Promise of whatever signOut() returns back to us.
export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
