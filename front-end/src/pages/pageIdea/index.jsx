import "./pageIdea.css";
import IdeaCard from "../../components/ideaCard";
import SearchBar from "../../components/searchBar"
import { useContext, useEffect, useState } from "react";
import { useVerifyRole } from "../../utils/VerifyRole";
import { StandbyContext } from "../../context/isStandbyContext";
import { motion as m } from "framer-motion";

export const Ideas = () => {
  const [searchTerm,setSearchTerm] = useState('')
  const [limit,setLimit] = useState(6)
  const [offset,setOffset] = useState(0)
  const [key, setKey] = useState(Date.now());
  const {selectPage} = useContext(StandbyContext)
  const isAdmOn = useVerifyRole()
 

  const handleCLick = () => {
    setKey(Date.now())
   
  }
  const handleTermChange = (term) =>{
    setSearchTerm(term)
    console.log(term)
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
    <m.div className="page" 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration:0.75, ease: 'easeOut' }}
    exit={{ opacity: 0}}
    >
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
    
    </m.div>
  );
};

export default Ideas;
