import Header from "../../components/header"
import loginPng from "../../assets/login.png"
import { Container } from "react-bootstrap"
import LoginForm from "../../components/loginForm"
import { useNavigate, Link } from "react-router-dom"
import "./pageLogin.css"

const PageLogin = () => {

    const navigate = useNavigate()
 

    return (
        <div className="login-page">
            <Header
                title="Ideias"
                to1="/example"
                link1="Cadastra-se"
                to2="/login"
                link2="Login"
            />
            <Container bsPrefix="login-page-container">


                <img src={loginPng} alt="imagem login" className="imagem-login" />

                <div className="form-login">
                    <LoginForm />
                    <p className="cad-message">Já tem login ? <Link to="/Cadastro" >Cadastre-se</Link></p>
                </div>


            </Container>




        </div>
    )
}


export default PageLogin