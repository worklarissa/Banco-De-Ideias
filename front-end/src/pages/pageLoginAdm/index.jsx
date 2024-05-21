
import AdmLoginForm from "../../components/admLoginForm"
import "./loginAdm.css"
import { Container } from "react-bootstrap"
import { useEffect } from "react"
import { useVerifyRole } from "../../utils/VerifyRole"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { useNavigate } from "react-router-dom"


function PageAdmLogin(){
 const isAdmOn = useVerifyRole()
 const isAuth = useAuthUser()
 const navigate = useNavigate()

   useEffect(()=>{
    if(isAuth){
        navigate("/")
    }

    isAdmOn()
   
   }, [])

    return(
        <>
    <Container bsPrefix="pageAdmLogin">
        <h1>Tela adm</h1>
        <AdmLoginForm />
    </Container>
    
        </>
        
    )
}


export default PageAdmLogin