import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* So now any component inside of this UserProvider nested deeper in the app 
          can access the context value inside of the provider itself. 
          => 
          => EX: our sign-in form is able to access this context because 
                  whenever the user signs in, we want to actually take this 
                  user object and we want to store it inside of the context. */}
      <UserProvider>
        {/* Because "Products" should be able to access the "User" 
            => Wrap "User" around, => "Products" can reach up into the "UserProvider"
            => "UserProvider" can't necessarily go into its children and are to fetch the data. */}
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
