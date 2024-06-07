import loginPng from "../../assets/login.png"
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Container } from "react-bootstrap"
import LoginForm from "../../components/loginForm"
import { useNavigate, Link } from "react-router-dom"
import "./pageLogin.css"
import { useEffect } from "react"
import { useVerifyRole } from "../../utils/VerifyRole"
import { motion as m } from "framer-motion";

const PageLogin = () => {

    const navigate = useNavigate()
    const isAuth = useIsAuthenticated()
    const isAdmOn = useVerifyRole()
    useEffect(() => {
        isAdmOn()
        if (isAuth) {
            navigate("/ideias")
        }
    }, [])

    return (
        <m.div className="login-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            exit={{ opacity: 0}}
        >
          
            <Container bsPrefix="login-page-container">


                <img src={loginPng} alt="imagem login" className="imagem-login" />

                <div className="form-login">
                    <LoginForm />
                    <p className="cad-message">Não tem uma conta ? <Link to="/cadastro" >Cadastre-se</Link></p>
                </div>


            </Container>




        </m.div>
    )
}


export default PageLogin