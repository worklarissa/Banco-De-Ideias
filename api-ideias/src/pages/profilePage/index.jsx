import { useState, useEffect } from "react";
import IdeaCard from "../../components/ideaCard";
import Header from "../../components/header";

import "./profilePage.css";
import { Link } from "react-router-dom";
import { FetchApi } from "../../utils/Fetch";

const ProfilePage = () => {
  const [countIdeas, setCount] = useState(0);

  useEffect(() => {
    FetchApi("GET", '', "", null).then((data) => {
      setCount(25);
    });
  }, []);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({ name: "Jonas Leite" });
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
              <p>Numero de ideias : {countIdeas} </p>
              <Link className="btn">Criar ideia</Link>
            </div>
          </div>
          <div className="profile-ideas">
            <div className="ideas">
              <span className="subtitle idea">Suas ideias de projetos</span>
              <IdeaCard
                url={`https:/getPostUser/${user}`}
                editable={true}
                cards={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
