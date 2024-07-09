
import AdmLoginForm from "../../components/admLoginForm"
import "./loginAdm.css"
import { Container } from "react-bootstrap"
import { useEffect } from "react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { useNavigate } from "react-router-dom"


function PageAdmLogin() {
    const isAuth = useAuthUser()
    const navigate = useNavigate()

    const verifyIsAdm = () => {
        if (isAuth?.role !== 'adm') {
            navigate('/admin/login')
        }

        if(isAuth){
            navigate('/')
        }
        
    }

    useEffect(() => {
        verifyIsAdm()

    }, [])

    return (
        <>
            <Container bsPrefix="pageAdmLogin">
                <h1 className="admin-title">Tela adm</h1>
                <AdmLoginForm />
            </Container>

        </>

    )
}


export default PageAdmLogin