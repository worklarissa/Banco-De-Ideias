  import { createBrowserRouter } from "react-router-dom";
  import Ideas from "../pages/pageIdea";
  import RotaExemplo from "../pages/pageExample";
import ProfilePage from "../pages/profilePage";

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <RotaExemplo/>,
    },
    {
      path:"/ideias",
      element:<Ideas/>
    },

    {
      path:"/perfil",
      element:<ProfilePage/>

    }
  ]);

  export default router;
