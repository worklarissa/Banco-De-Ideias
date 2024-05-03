import { Link } from "react-router-dom";
import Header from "../../components/header";
import "./pageIdea.css";
import IdeaCard from "../../components/ideaCard";

export const Ideas = () => {
  return (
    <div>
      <Header
        title="Ideias"
        to1="/example"
        link1="Cadastra-se"
        to2="/login"
        link2="Login"
      />

      <h1 className="title">Ideias</h1>

      <h2 className="title2">Explore ideias de projetos!</h2>
      <IdeaCard cards={4}/>
    
    </div>
  );
};

export default Ideas;
