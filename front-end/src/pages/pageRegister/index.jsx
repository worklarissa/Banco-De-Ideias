import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Container } from "react-bootstrap"

import RegisterPng from "../../assets/register.png"
import { useNavigate, Link } from "react-router-dom"
import "./pageRegister.css"
import { useEffect } from "react"
import RegisterForm from "../../components/registerForm"
import { useVerifyRole } from "../../utils/VerifyRole"
import { motion as m } from "framer-motion";


const PageRegister = () => {

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
        <m.div className="register-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            exit={{ opacity: 0 }}
        >
            <Container bsPrefix="register-page-container">


                <img src={RegisterPng} alt="imagem Register" className="imagem-register" />

                <div className="form-register">
                    <RegisterForm />
                    <p className="cad-message">Já tem login ? <Link to="/login" >Entre na sua conta!</Link></p>
                </div>


            </Container>




        </m.div>
    )
}


export default PageRegister