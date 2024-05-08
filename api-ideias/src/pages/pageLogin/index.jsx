import Header from "../../components/header"
import loginPng from "../../assets/login.png"
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Container } from "react-bootstrap"
import LoginForm from "../../components/loginForm"
import { useNavigate, Link } from "react-router-dom"
import "./pageLogin.css"
import { useEffect } from "react"

const PageLogin = () => {

    const navigate = useNavigate()
    const isAuth = useIsAuthenticated()

   useEffect(()=>{
    if(isAuth){
        navigate("/ideias")
    }
   }, [])

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
                    <p className="cad-message">Não tem uma conta ? <Link to="/cadastro" >Cadastre-se</Link></p>
                </div>


            </Container>




        </div>
    )
}


export default PageLogin