import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Ideas from "../pages/pageIdea";
import ProfilePage from "../pages/profilePage";
import PageCreateIdea from "../pages/pageCreateIdea";
import PageLogin from "../pages/pageLogin";
import PageRegister from "../pages/pageRegister";
import Home from "../pages/pageHome";
import StandbyProvider from "../context/isStandbyContext";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PageLogin />} />
        <Route path="/cadastro" element={<PageRegister />} />
        <Route path="/" element={<Home />} />
        <Route 
        path="/ideias" 
        element={
        <RequireAuth fallbackPath="/login">
          <StandbyProvider>
        <Ideas />
        </StandbyProvider>
        </RequireAuth>
        } 
        />
        <Route
          path="/perfil"
          element={
            <RequireAuth fallbackPath="/login">
              <StandbyProvider>
              <ProfilePage />
              </StandbyProvider>
            </RequireAuth>
          }
        />
        <Route
          path="/criar"
          element={
            <RequireAuth fallbackPath="/login">
              
              <PageCreateIdea />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
