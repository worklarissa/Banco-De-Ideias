// import IdeaCarousel from "../../components/carousel"
import Header from "../../components/header/index"
import headerHome from "../../assets/header-animation1.svg"
import "./pageHome.css"

export default function Home (){
    return(
        <>
            <Header
        title="Ideias"
        to1="/example"
        link1="Cadastra-se"
        to2="/login"
        link2="Login"/>

        <div className= "section-sobre-home">
            <img src={headerHome} alt="personagem flutante perto de uma lâmpada, representando as 'ideias'" className="imagem-home"/>
            <div className="text-sobre-home">
                <h1> Hello World </h1><br/>
                <p>Em busca de inspiração para expandir seu portfólio de projetos de desenvolvimento? Você está no lugar certo!
                    Nosso site é um tesouro de ideias prontas para serem exploradas, desenvolvidas e aprimoradas por você, 
                    essenciais na jornada de se tornar um desenvolvedor de destaque. Navegue por nossa coleção de ideias e 
                    descubra aquela que mais se alinha com seus interesses, habilidades e metas. Cada ideia vem com uma descrição 
                    detalhada, sugestões de recursos e até mesmo possíveis desafios que você pode enfrentar durante o desenvolvimento.
                    Não importa se você é um novato procurando por seu primeiro projeto ou um desenvolvedor experiente em busca de 
                    um novo desafio, estamos aqui para ajudá-lo a encontrar a inspiração que você precisa para construir um 
                    portfólio impressionante e impulsionar sua carreira. Comece a explorar agora e transforme suas ideias em realidade!
                </p><br/>
            </div>
        </div>

        <div>
            <h2>Visualize as <span>ideias</span>mais<span>populares</span>no momento!</h2> 

            <div></div>
        </div>

        <div>
            <h2>Aprenda Mais com esses artigos!</h2>

            <div>
            
            </div>
        </div>

        
        </>
    )
}