
import Header from "../../components/header"

import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Container } from "react-bootstrap"

import RegisterPng from "../../assets/register.png"
import { useNavigate, Link } from "react-router-dom"
import "./pageRegister.css"
import { useEffect } from "react"
import RegisterForm from "../../components/registerForm"


const PageRegister = () => {

    const navigate = useNavigate()
    const isAuth = useIsAuthenticated()

   useEffect(()=>{
    if(isAuth){
        navigate("/ideias")
    }
   }, [])

    return (
        <div className="register-page">
            <Header
                title="Ideias"
                to1="/example"
                link1="Cadastra-se"
                to2="/Register"
                link2="Register"
            />
            <Container bsPrefix="register-page-container">


                <img src={RegisterPng} alt="imagem Register" className="imagem-register" />

                <div className="form-register">
                    <RegisterForm />
                    <p className="cad-message">Já tem login ? <Link to="/login" >Entre na sua conta!</Link></p>
                </div>


            </Container>




        </div>
    )
}


export default PageRegister