import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import PageAdmLogin from "../pages/pageLoginAdm";
import PageAdmDashBoard from "../pages/pageAdmDashboard";
import LoadingPage from '../components/pageLoader';
import { AnimatePresence } from "framer-motion";
import { UseVerifyRole } from '../utils/VerifyRole';
import NotFoundPage from '../pages/pageNotFound';


const LazyHome = React.lazy(() => import('../pages/pageHome'))
const LazyLogin = React.lazy(() => import('../pages/pageLogin'))
const LazyRegister = React.lazy(() => import('../pages/pageRegister'))
const LazyIdeas = React.lazy(() => import('../pages/pageIdea'))
const LazyProfilePage = React.lazy(() => import('../pages/profilePage'))
const LazyCreateIdea = React.lazy(() => import('../pages/pageCreateIdea'))





function Router() {
  const local = useLocation()
  return (

    <AnimatePresence mode={'wait'}>
      <Routes key={local.pathname} location={local}>
        <Route path="/login" element={<React.Suspense fallback={<LoadingPage />}><UseVerifyRole><LazyLogin /></UseVerifyRole></React.Suspense>} />
        <Route path="/cadastro" element={<React.Suspense fallback={<LoadingPage />}><UseVerifyRole><LazyRegister /></UseVerifyRole></React.Suspense>} />
        <Route path="/admin/login" element={<PageAdmLogin />} />
        <Route path="/admin/dashboard" element={<PageAdmDashBoard />} />
        <Route path="/" element={<React.Suspense fallback={<LoadingPage />}><UseVerifyRole><LazyHome /></UseVerifyRole></React.Suspense>} />


        <Route
          path="/ideias"
          element={
            <RequireAuth fallbackPath="/login">
              <React.Suspense fallback={<LoadingPage />}><UseVerifyRole><LazyIdeas /></UseVerifyRole></React.Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/perfil"
          element={
            <RequireAuth fallbackPath="/login">
              <React.Suspense fallback={<LoadingPage />}><UseVerifyRole><LazyProfilePage /></UseVerifyRole></React.Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/criar"
          element={
            <RequireAuth fallbackPath="/login">
              <React.Suspense fallback={<LoadingPage />}><UseVerifyRole><LazyCreateIdea /></UseVerifyRole></React.Suspense>
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>

  );
};


export default Router;
