
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AdminDataContext } from "../../context/adminDataContext";
import { FetchApi } from "../../utils/Fetch";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import "./admDash.css"

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import DataCard from "../../components/admDataCard";


function PageAdmDashBoard() {
    const { setItems, dataItems } = useContext(AdminDataContext)
    const [url, setUrl] = useState('')
    const [nextUrl, setNextUrl] = useState('')
    const [visible, setVisible] = useState(false)
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

    const toggleUrl = (key) => {
        setItems([])
        setUrl('')
        switch (key) {
            case 'valid':

                break;

            case 'invalid':
                setTimeout(()=>{
                    setUrl('/adm/invalid-projects')
                }, 100)
               
                console.log(url)
                break;

            case 'users':
                setUrl('/adm/invalid-projects')
                break;

            default:
                break;
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

    const handleNewUrl = () => {
        if (nextUrl !== null) {
            return setUrl(nextUrl);
        }
    }

    const getData = async () => {
        const cleanToken = useHeader.replace("x-acess-token", "");
        try {
            const request = await FetchApi('GET', `${ApiUrl}${url}`, '', cleanToken)
            console.log(request)

            if (request.nextUrl !== null) {
                setNextUrl(request.nextUrl);
            }

            if (dataItems.length > 0) {
                return setItems((prevItems) => {
                    const newItems = request.projects.filter(
                        (newItem) => !prevItems.some((item) => item.id === newItem.id)
                    );
                    return [...prevItems, ...newItems];
                });
                //  setItems((prevItems) => [...prevItems, ...request.projects])
            }

            setItems(request.projects)

            console.log(dataItems)


        } catch (error) {
            console.log(error)
        }

    }




    const handleClick = async (value) => {
      toggleUrl(value)
       

    }

    useEffect(() => {
        verifyIsAdm()
    }, [])

    useEffect(() => {
        console.log('ativou o use effect')
        if (url) {
            getData()
        }

    }, [url])

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
                                <button className="change-operation" onClick={() => handleClick('invalid')}>Ideias invalidas</button>
                                <button className="change-operation">Todas as ideias</button>
                                <button className="change-operation">Todos os usuários</button>
                                <button className="change-operation">Todos os adms</button>
                            </div>

                            <div className="itens-adm-box">
                                <DataCard />
                            </div>
                            <div className="btn-div-adm">
                                <button className="load-more-adm" onClick={() => handleNewUrl()}>Carrega Mais</button>
                            </div>
                        </div>

                    </div>

                </Container>
            )}

        </>
    )
}

export default PageAdmDashBoard