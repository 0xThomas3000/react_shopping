import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth"; // To track code followed user signin with reDirect()

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // Run this when the application mounts
  // Pass in empty array meaning run this useEffect() once this Component SignIn() mounts for the first time
  useEffect(() => {
    async function fetchData() {
      const response = await getRedirectResult(auth);
      if (response) {
        // If we have sth back
        // Want to generate this Doc from this "particular user"
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
      console.log(response);
    }
    fetchData();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log({ user });
  // };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};

export default SignIn;
