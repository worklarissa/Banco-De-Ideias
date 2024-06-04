// import IdeaCarousel from "../../components/carousel"
import "./pageHome.css";
import Header from "../../components/header/index";
import headerHome from "../../assets/header-animation1.svg";
import articleImage from "../../assets/artigos.svg";
import Footer from "../../components/footer";
import IdeaCarousel from "../../components/carousel";
import { useVerifyRole } from "../../utils/VerifyRole";
import { useEffect } from "react";

export default function Home() {
  const isAdmOn = useVerifyRole()
  const ApiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    isAdmOn()
  }, [])

  return (
    <>
      <Header
        title="Ideias"
        to1="/example"
        link1="Cadastra-se"
        to2="/login"
        link2="Login"
      />

      <div className="section-sobre-home">
        <div className="text-sobre-home">
          <img
            src={headerHome}
            alt="personagem flutante perto de uma lâmpada, representando as 'ideias'"
            className="imagem-home"
          />
          <div className="middle-text">
            <h1 className="main-title-home">
              {" "}
              <span className="yellow-text">&lt;&gt;</span>Banco de ideias
              <span className="yellow-text">&lt;/&gt;</span>{" "}
            </h1>
            <p className="text-middle-page">
              {" "}
              Você está no lugar certo! Nosso site é um tesouro de ideias
              prontas para serem exploradas, desenvolvidas e aprimoradas por
              você, essenciais na jornada de se tornar um desenvolvedor de
              destaque. Navegue por nossa coleção de ideias e descubra aquela
              que mais se alinha com seus interesses, habilidades e metas.
            </p>
          </div>
        </div>
      </div>

      <div className="cards">
        <h1 className="carrosel-title1">
          Visualize as <span className="yellow-text">ideias</span> mais{" "}
          <span className="blue-text">populares</span> no momento!
        </h1>

        <IdeaCarousel url={`${ApiUrl}/project/show-valid?limit=9&offset=0`} />
      </div>

      <div className="cards">
        <h1 className="carrosel-title1">
          <span className="blue-text">Aprenda mais com esses </span>
          <span className="yellow-text">artigos!</span>

        </h1>

        <div className="articles">
          <div className="double-article">
            <div className="card-article">
              <p className="text-article-card">Feature em progresso!</p>
            </div>
            <div className="card-article">
              <p className="text-article-card">Feature em progresso!</p>
            </div>
          </div>
          <img
            src={articleImage}
            alt="pessoa com livro"
            className="article-image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
