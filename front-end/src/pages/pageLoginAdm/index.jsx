
import AdmLoginForm from "../../components/admLoginForm"
import "./loginAdm.css"
import { Container } from "react-bootstrap"
import { useEffect } from "react"
import { useVerifyRole } from "../../utils/VerifyRole"


function PageAdmLogin(){
 const isAdmOn = useVerifyRole()

   useEffect(()=>{
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