import gitIcon from "../../assets/gitIcon.png"
import "./footer.css"
function Footer() {

    return (
      <footer className="footer">
         <div>
          <p>&copy; 2024 Todos os direitos reservados.</p>
        </div>
        {/* <div>
          <h3>Redes sociais</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div> */}

        <div className="icon-git-div">
          <h3 className="subtitle-git">Repositorio git</h3>
         <a href="https://github.com/worklarissa/Banco-De-Ideias-API-Front"><img src={gitIcon} alt="icone git" className="git-icon-image" /></a> 
        </div>


        
      </footer>
    );
  }
  
  export default Footer;