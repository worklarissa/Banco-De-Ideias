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
  const headers = useAuthHeader();
  const Token = headers ? headers.replace("x-acess-token", ""): null;
  const authUser = useAuthUser();
  const getData = async()=>{
    const data = await FetchApi("GET", `https://banco-de-ideiasapi.up.railway.app/project/show-my?limit=0`, '', Token)
    console.log(data.totalOfProjects)
    setCount(data.totalOfProjects)
    
  }
  useEffect(()=>{
   
    getData()

  },[])
 
  return (
    <div>
      <Header to1="/" link1="Home" to2="/ideias" link2="Todas ideias"/>
      <div>
        <h1 className="title">Perfil</h1>
        <div className="profile-page">
          <div className="profile-info">
            <div className="infos">
              <h2 className="subtitle">{authUser.name}</h2>

              <Link className="btn" to="/criar">Criar ideia</Link>
              <Link className="btn">Ideias a serem Aprovadas</Link>
            </div>
          </div>
          <div className="profile-ideas">
            <div className="ideas">
              <span className="subtitle idea">Suas ideias de projetos</span>
              <IdeaCard
                url={ `show-my?limit=1&offset=0`}
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