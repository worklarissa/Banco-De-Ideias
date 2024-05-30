import Header from "../../components/header";
import "./pageIdea.css";
import IdeaCard from "../../components/ideaCard";
import SearchBar from "../../components/searchBar"
import { useContext, useEffect, useState } from "react";
import { useVerifyRole } from "../../utils/VerifyRole";
import { StandbyContext } from "../../context/isStandbyContext";

export const Ideas = () => {

  const [key, setKey] = useState(Date.now());
  const {selectPage} = useContext(StandbyContext)
  const isAdmOn = useVerifyRole()

  useEffect(() => {
    isAdmOn()
    selectPage('ideias')
    setKey(Date.now()); 
  }, []);

  
  return (
    <div className="page">
      <Header
        title="Ideias"
        to1="/example"
        link1="Cadastra-se"
        to2="/login"
        link2="Login"
      />

      <h1 className="title1">Ideias</h1>
     
      <div className="top-section">
    
      <h2 className="title2">Explore ideias de projetos!</h2>
      <SearchBar/>
      </div>
      
      <IdeaCard cards={4}  url="show-valid?limit=6&offset=0`"  key={key} />
    
    </div>
  );
};

export default Ideas;
