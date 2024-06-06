import React from "react";
import ReactDOM from "react-dom/client";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import 'react-toastify/dist/ReactToastify.min.css';
import App from "./app";
import { BrowserRouter } from "react-router-dom";



const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthProvider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
     
  </AuthProvider>

);
