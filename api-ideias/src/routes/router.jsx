import { createBrowserRouter } from "react-router-dom";
import Ideas from "../pages/pageIdea";
import RotaExemplo from "../pages/pageExample";

const router = createBrowserRouter([
  {
    path: "/ideias",
    element: <Ideas />,
  },
  {
     path:"/example",
     element: <RotaExemplo/>
  },
]);

export default router;
