
import { Container } from "react-bootstrap"
import "./admDash.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { FetchApi } from "../../utils/Fetch";
import useSignOut from "react-auth-kit/hooks/useSignOut";

function PageAdmDashBoard() {

    const navigate = useNavigate()
    const authUser = useAuthUser()
    const useHeader = useAuthHeader()
    const signOut = useSignOut()
    const ApiUrl = import.meta.env.VITE_API_URL

    const role = authUser?.role
    const verifyIsAdm = () => {
        if (role !== 'adm') {
            console.log(role)
            console.log(authUser)
            navigate('/admin/login')
        }
    }

    const handleLogout = async () => {
        try {
            const token = useHeader.replace("x-acess-token ", "");
            console.log(token)
            await FetchApi(
                "POST",
                `${ApiUrl}/adm/logout`,
                "",
                token
            );

            signOut()
            navigate('/admin/login')
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        verifyIsAdm()
    }, [])

    return (
        <>
            {role !== 'adm' ? null : (
                <Container bsPrefix="adm-box">
                    <div className="operations-box">
                        <div className="title-dashboard">
                            <h2 className="gen-title">gerenciar projetos</h2>
                            <div className="adm-message">
                                <p>seja bem vindo {authUser.name}</p>
                                <button className="logout-adm" onClick={handleLogout}>Logout</button>
                            </div>

                        </div>
                        <div className="display-buttons-box">
                            <div className="main-buttons-adm">
                                <button className="change-operation">Ideias invalidas</button>
                                <button className="change-operation">Todas as ideias</button>
                                <button className="change-operation">Todos os usuários</button>
                                <button className="change-operation">Todos os adms</button>
                            </div>

                            <div className="itens-adm-box">

                            </div>
                        </div>

                    </div>

                </Container>
            )}

        </>
    )
}

export default PageAdmDashBoard