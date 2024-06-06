import Header from "../../components/header";
import "./pageIdea.css";
import IdeaCard from "../../components/ideaCard";
import SearchBar from "../../components/searchBar"
import { useContext, useEffect, useState } from "react";
import { useVerifyRole } from "../../utils/VerifyRole";
import { StandbyContext } from "../../context/isStandbyContext";

export const Ideas = () => {
  const [searchTerm,setSearchTerm] = useState('')
  const [offset,setOffset] = useState(0)
  const [limit,setLimit] = useState(6)
  const [key, setKey] = useState(Date.now());
  const {selectPage} = useContext(StandbyContext)
  const isAdmOn = useVerifyRole()
 

  const handleCLick = () => {
    setKey(Date.now())
   
  }
  const handleTermChange = (term) =>{
    setSearchTerm(term)
    if(!term){
      setKey(Date.now())
    }
   
  }
  const url = searchTerm 
  ? `show-searched?term=${searchTerm}&`
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
      onClickSearch={handleCLick}
      /> 
      </div>
      
      <IdeaCard 
      cards={4}
      limitInitial={limit}
      offsetInitial={offset}  
      url={url} 
      key={key} 
      />
    
    </div>
  );
};

export default Ideas;
