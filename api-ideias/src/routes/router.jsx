import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Ideas from "../pages/pageIdea";
import ProfilePage from "../pages/profilePage";
import PageCreateIdea from "../pages/pageCreateIdea";
import PageLogin from "../pages/pageLogin";
import PageRegister from "../pages/pageRegister";
import Home from "../pages/pageHome";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/cadastro" element={<PageRegister />} />
        <Route path="/" element={<Home />} />
        <Route 
        path="/ideias" 
        element={
        <RequireAuth>
        <Ideas />
        </RequireAuth>
        } 
        />
        <Route
          path="/perfil"
          element={
            <RequireAuth fallbackPath="/login">
              <ProfilePage />
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
