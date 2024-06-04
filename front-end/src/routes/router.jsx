import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
// import Ideas from "../pages/pageIdea";
// import ProfilePage from "../pages/profilePage";
// import PageCreateIdea from "../pages/pageCreateIdea";
// import PageLogin from "../pages/pageLogin";
// import PageRegister from "../pages/pageRegister";
// import Home from "../pages/pageHome";

import StandbyProvider from "../context/isStandbyContext";
import PageAdmLogin from "../pages/pageLoginAdm";
import PageAdmDashBoard from "../pages/pageAdmDashboard";
import LoadingPage from '../components/pageLoader';

const LazyHome = React.lazy(() => import('../pages/pageHome'))
const LazyLogin = React.lazy(() => import('../pages/pageLogin'))
const LazyRegister = React.lazy(() => import('../pages/pageRegister'))
const LazyIdeas = React.lazy(() => import('../pages/pageIdea'))
const LazyProfilePage = React.lazy(() => import('../pages/profilePage'))
const LazyCreateIdea = React.lazy(() => import('../pages/pageCreateIdea'))



const Router = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<React.Suspense fallback={<LoadingPage />}><LazyLogin /></React.Suspense>} />
        <Route path="/cadastro" element={<React.Suspense fallback={<LoadingPage />}><LazyRegister/></React.Suspense>} />
        <Route path="/admin/login" element={<PageAdmLogin />} />
        <Route path="/admin/dashboard" element={<PageAdmDashBoard /> } />
        <Route path="/" element={<React.Suspense fallback={<LoadingPage />}><LazyHome /></React.Suspense>} />


        <Route 
        path="/ideias" 
        element={
        <RequireAuth fallbackPath="/login">
          <StandbyProvider>
         <React.Suspense fallback={<LoadingPage />}><LazyIdeas /></React.Suspense> 
        </StandbyProvider>
        </RequireAuth>
        } 
        />
        <Route
          path="/perfil"
          element={
            <RequireAuth fallbackPath="/login">
              <StandbyProvider>
               <React.Suspense fallback={<LoadingPage />}><LazyProfilePage /></React.Suspense>
              </StandbyProvider>
            </RequireAuth>
          }
        />
        <Route
          path="/criar"
          element={
            <RequireAuth fallbackPath="/login">
              
              <React.Suspense fallback={<LoadingPage />}><LazyCreateIdea /></React.Suspense>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
