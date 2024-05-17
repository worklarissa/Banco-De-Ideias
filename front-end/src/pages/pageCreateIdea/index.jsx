import { IdeaForm } from "../../components/form";
import Header from "../../components/header";
import logo from "../../assets/banner.png";
import "./pageCreateIdea.css";
import { useEffect } from "react";
import { useVerifyRole } from "../../utils/VerifyRole";

const PageCreateIdea = () => {
  const isAdmOn = useVerifyRole()
  useEffect(()=>{
    isAdmOn()
  },[])
  return (
    <div className="pageCreateIdea">
      <Header link1="Ideias" to1="/ideias" link2="Perfil" to2="/perfil" />

      <h1 className="title-create-idea">Crie sua ideia!</h1>
      <div className="create">
        <IdeaForm />

        <img className="banner" src={logo} width={400} height={500} />
      </div>
    </div>
  );
};

export default PageCreateIdea