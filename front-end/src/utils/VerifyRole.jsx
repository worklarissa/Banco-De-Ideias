import { Navigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";


export const UseVerifyRole = ({children}) =>{

    const authUser = useAuthUser()

    if(authUser?.role === "adm"){
        return <Navigate to='/admin/dashboard' />
    }
    return children

}



// export const useVerifyRole = ({children}) =>{

//     const authUser = useAuthUser()
//     const navigate = useNavigate();
//     const verifyRole = ()=>{
//         if(authUser?.role === "adm"){
//             navigate('/admin/dashboard')
//         }
//     }

//     useEffect(()=>{
//         verifyRole()
//     },[])

//     return children
// }