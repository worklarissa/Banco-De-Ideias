import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/router";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import {ToastContainer} from 'react-toastify'
import AdminDataProvider from "./context/adminDataContext";


const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

ReactDOM.createRoot(document.getElementById("root")).render(

    <AuthProvider store={store}>
      <ToastContainer closeOnClick="true" />
      <AdminDataProvider>
      <Router />
      </AdminDataProvider>
      
    
    </AuthProvider>

);
