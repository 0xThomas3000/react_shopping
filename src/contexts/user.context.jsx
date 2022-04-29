import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
} from "../utils/firebase/firebase.utils";
// as the actual value we wanna access
export const UserContext = createContext({
  // The context needs an initial value => just want to build the base empty state of what this is.
  // So currentUser being an actual object.
  currentUser: null, // There's no context when the "currentUser" is null
  setCurrentUser: () => null,
});

/* This Provider allows any of its child components ({children}) to access the values inside of its useState. */
/* Aim: Create this user provider and we want to wrap it around the portion of our code that matters.
    (Wrap <UserProvider> around our <App/>)
*/
export const UserProvider = ({ children }) => {
  // A Component can leverage a Hook to allow us to store things (a user state in this case)
  // => We want to be able to call this setter and get the value anywhere inside of the component tree
  //    that is nested within this actual <Provider> value.
  const [currentUser, setCurrentUser] = useState(null); // Store a user state using useState Hook
  const value = { currentUser, setCurrentUser }; // Storing a user object which is the "actual contextual value"

  signOutUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
