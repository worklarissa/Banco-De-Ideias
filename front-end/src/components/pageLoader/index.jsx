import "./loadingPage.css"
import loadingSvg from "../../assets/spinner-animation.svg"

 function LoadingPage(){
    return(
        <div className="loader-page">
            <img src={loadingSvg} alt="carregando" className="loader" />
        </div>
    )
}

export default LoadingPage