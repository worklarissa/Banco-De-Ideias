import Header from "../../components/header";
import "./pageIdea.css";
import IdeaCard from "../../components/ideaCard";
import { useEffect, useState } from "react";

export const Ideas = () => {

  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    setKey(Date.now()); 
  }, []);

  
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
      <IdeaCard cards={4}  url="show-valid?limit=6&offset=0`"  key={key} />
    
    </div>
  );
};

export default Ideas;
