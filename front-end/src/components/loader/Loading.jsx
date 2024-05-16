import "./loading.css"
import loadingSvg from "../../assets/spinner-animation.svg"

 function Loading(){
    return(
        <div className="loader-container">
            <img src={loadingSvg} alt="carregando" className="loader" />
        </div>
    )
}

export default Loading