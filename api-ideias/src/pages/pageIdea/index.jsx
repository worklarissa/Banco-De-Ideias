import { Link } from "react-router-dom";
import Header from "../../components/header";

export const Ideas = () => {
  return (
    <div>
      <Header title='Ideias' to1='/example' link1='Cadastra-se'to2='/login' link2='Login'/>
      <h1> Rota de exemplo </h1>
      <Link to="/example">Clique aqui para ir para a pagina de exemplo</Link>
    </div>
  );
};

export default Ideas;
