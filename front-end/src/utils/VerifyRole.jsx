import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";


export const useVerifyRole = () =>{

    const authUser = useAuthUser()
    const navigate = useNavigate();
    const verifyRole = ()=>{
        if(authUser?.role === "adm"){
            navigate('/admin/dashboard')
        }
    }

    return verifyRole
}