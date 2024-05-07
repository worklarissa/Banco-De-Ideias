import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Ideas from "../pages/pageIdea";
import RotaExemplo from "../pages/pageExample";
import ProfilePage from "../pages/profilePage";
import PageCreateIdea from "../pages/pageCreateIdea";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RotaExemplo />} />
        <Route path="/ideias" element={<Ideas />} />
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
