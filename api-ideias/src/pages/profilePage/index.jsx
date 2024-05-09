import { useState, useEffect } from "react";
import IdeaCard from "../../components/ideaCard";
import Header from "../../components/header";

import "./profilePage.css";
import { Link } from "react-router-dom";
import { FetchApi } from "../../utils/Fetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const ProfilePage = () => {
  const [countIdeas, setCount] = useState(0);
  const [ideaCardUrl, setIdeaCardUrl] = useState('show-my?limit=1&offset=0');
  const [key, setKey] = useState(Date.now())
  const [title, setTitle] = useState('Suas ideias de projetos');
  const [buttonText, setButtonText] = useState('Ideias a serem Aprovadas');
  const headers = useAuthHeader();
  const Token = headers ? headers.replace("x-acess-token", ""): null;
  const authUser = useAuthUser();
  const getData = async()=>{
    const data = await FetchApi("GET", `https://banco-de-ideiasapi.up.railway.app/project/${ideaCardUrl}`, '', Token)
    console.log(data.totalOfProjects)
    setCount(data.totalOfProjects)
  }
  useEffect(()=>{
    getData()
  },[ideaCardUrl]) 
 
  const handleButtonClick = () => {
    if (ideaCardUrl === 'show-my?limit=1&offset=0') {
      setIdeaCardUrl('/show-standby?limit=1&offset=0');
      setButtonText('Ideias Aprovadas');
      setTitle('Ideias a serem Aprovadas');
      
    } else {
      setIdeaCardUrl('show-my?limit=1&offset=0');
      setButtonText('Ideias a serem Aprovadas');
      setTitle('Suas ideias de projetos');
    }
    setKey(Date.now()); 
  }

  return (
    <div className="profile-page-div">
      <Header to1="/" link1="Home" to2="/ideias" link2="Todas ideias"/>
      <div>
        <h1 className="title">Perfil</h1>
        <div className="profile-page">
          <div className="profile-info">
            <div className="infos">
              <h2 className="subtitle">{authUser.name}</h2>
              <p className="paragraph">total de ideias : {countIdeas}</p>
              <div className="buttons-profile">
              <Link className="btn" to="/criar">Criar ideia</Link>
              <button className="btn" onClick={handleButtonClick}>{buttonText}</button>
              </div>
             
            </div>
          </div>
          <div className="profile-ideas">
            <div className="ideas">
            <span className="subtitle idea">{title}</span> 
              <IdeaCard
                url={ideaCardUrl}
                editable={true}
                cards={2}
                key={key}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
