  import { createBrowserRouter } from "react-router-dom";
  import Ideas from "../pages/pageIdea";
  import RotaExemplo from "../pages/pageExample";

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <RotaExemplo/>,
    },
    {
      path:"/ideias",
      element:<Ideas/>
    },
  ]);

  export default router;
