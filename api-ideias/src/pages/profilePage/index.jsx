import { useState, useEffect } from "react";
import IdeaCard from "../../components/ideaCard";
import Header from "../../components/header";

import "./profilePage.css";
import { Link } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const ProfilePage = () => {
  const [ideaCardUrl, setIdeaCardUrl] = useState('show-my?limit=1&offset=0');
  const [key, setKey] = useState(Date.now())
  const [title, setTitle] = useState('Suas ideias de projetos');
  const [buttonText, setButtonText] = useState('Ideias a serem Aprovadas');

  const authUser = useAuthUser();

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
