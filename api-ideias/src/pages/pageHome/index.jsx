import IdeaCarousel from "../../components/carousel"
import Header from "../../components/header/index"

export default function Home (){
    return(
        <>
            <Header
        title="Ideias"
        to1="/example"
        link1="Cadastra-se"
        to2="/login"
        link2="Login"/>

        <div>
            <img src=""></img>
            <h1> <>Hello World</> </h1>
        </div>

        <div>
            <h2>Visualize as <h2>ideias</h2> mais <h2>populares</h2> no momento!</h2> 

            <IdeaCarousel/>
        </div>

        <div>
            <h2><h2>Aprenda Mais</h2> com esses <h2>artigos</h2>!</h2>

            <div>
            
            </div>
        </div>

        
        </>
    )
}