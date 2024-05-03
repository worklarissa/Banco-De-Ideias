import { useState, useEffect } from "react";
import IdeaCard from "../../components/ideaCard";
import Header from "../../components/header";
import "./profilePage.css";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    
    setUser({ name: "Jonas Leite", ideaCount: 10 });
  }, []);

  return (
    <div>
      <Header to1="/" link1="Home" to2="/ideias" link2="Todas ideias" />

      <div>
        <h1 className="title">Perfil</h1>

        <div className="profile-page">
          <div className="profile-info">
            <div className="infos">
              <h2 className="subtitle">{user?.name}</h2>
              <p>Numero de ideias : {user?.ideaCount} </p>
              <Link className="btn">Criar ideia</Link>
            </div>
          </div>
          <div className="profile-ideas">
             <div className="ideas">
             <span className="subtitle idea">Suas ideias de projetos</span>     
             <IdeaCard url={`https:/getPostUser/${user}`} editable={true} cards={2}/>
             </div>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
