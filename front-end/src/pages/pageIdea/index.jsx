import Header from "../../components/header";
import "./pageIdea.css";
import IdeaCard from "../../components/ideaCard";
import SearchBar from "../../components/searchBar"
import { useContext, useEffect, useState } from "react";
import { useVerifyRole } from "../../utils/VerifyRole";
import { StandbyContext } from "../../context/isStandbyContext";

export const Ideas = () => {
  const [searchTerm,setSearchTerm] = useState('')
  const [key, setKey] = useState(Date.now());
  const {selectPage} = useContext(StandbyContext)
  const isAdmOn = useVerifyRole()
 

  const handleTermChange = (term) =>{
    setSearchTerm(term)
    console.log(term)
  }
 
  const url = searchTerm 
  ? `show-searched?limit=10&offset=0&title=${searchTerm}`
  : "show-valid?limit=6&offset=0";



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
      <SearchBar 
      onSearchTermChange={handleTermChange} 
      value={searchTerm} 
      /> 
      </div>
      
      <IdeaCard 
      cards={4}  
      url={url} 
      key={url} 
      />
    
    </div>
  );
};

export default Ideas;
