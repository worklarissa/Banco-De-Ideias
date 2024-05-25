
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { AdminDataContext } from "../../context/adminDataContext";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FetchApi } from "../../utils/Fetch";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import "./admDash.css"

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import DataCard from "../../components/admDataCard";
import Loading from "../../components/loader/Loading";


function PageAdmDashBoard() {
    const { setItems, dataItems, confirmation, toggleConfirmation, confirmationValue, operation, editMenu,toggleEditMenu } = useContext(AdminDataContext)
    const [url, setUrl] = useState('')
    const [nextUrl, setNextUrl] = useState('')
    const [isLoading, setLoadingStop] = useState(true)
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const authUser = useAuthUser()
    const useHeader = useAuthHeader()
    const signOut = useSignOut()
    const ApiUrl = import.meta.env.VITE_API_URL
    const editForm = useRef(null)


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
                setTimeout(() => {
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
        const cleanToken = useHeader.replace("x-acess-token ", "");
        try {
            await FetchApi(
                "POST",
                `${ApiUrl}/adm/logout`,
                "",
                cleanToken
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

    const confirmDelete = (postId) => {
        handleDelete(postId)
        toggleConfirmation()
    }
    const confirmValidate = (postId) => {
        handleValidate(postId)
        toggleConfirmation()
    }



    const handleDelete = async (id) => {
        const cleanToken = useHeader.replace("x-acess-token ", "");
        try {
            const request = await FetchApi(
                "DELETE",
                `${ApiUrl}/adm/delete-project/${id}`,
                "",
                cleanToken
            );
            console.log(request)

            setItems(dataItems.filter((item) => item.id !== id));
        } catch (error) {
            console.log(error)
            if (error.response?.status === 401) {
                signOut()
                navigate()
            }
        }
    };

    const handleValidate = async (id) => {
        const cleanToken = useHeader.replace("x-acess-token ", "");
        try {
            const body = { isValid: true }
            const request = await FetchApi(
                "PATCH",
                `${ApiUrl}/adm/update-project/${id}`,
                body,
                cleanToken
            );
            console.log(request)

            setItems(dataItems.filter((item) => item.id !== id));
        } catch (error) {
            console.log(error)
            if (error.response?.status === 401) {
                signOut()
                navigate()
            }
        }
    };



    const getData = async () => {
        const cleanToken = useHeader.replace("x-acess-token ", "");
        setLoadingStop(false)
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
        } finally {
            setLoadingStop(true); // Set loading to false
        }


    }

    const handleClick = async (value) => {
        toggleUrl(value)


    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const cleanToken = useHeader.replace("x-acess-token ", "");
        const title = editForm.current.title.value
        const text = editForm.current.text.value
        const difficultLevel = editForm.current.difficultLevel.value
        const hashtagsString = editForm.current.hashtags.value.replace(/,/g, ' ').trim() // Remove espaços em branco extras
        const hashtags = hashtagsString.split(/\s+/);
        const editObject = {title:title,text:text,difficultLevel:difficultLevel, hashtags}

        try {
            const data = await FetchApi(
                "PATCH",
                `${ApiUrl}/adm/update-project/${confirmationValue.id}`,
                editObject,
                cleanToken
              );

              console.log(data.project)

              setItems((prevItems)=>{
                return prevItems.map((item)=>{
                    return item.id === data.project.id ? data.project : item
                })
              })

              toggleEditMenu()
         
        } catch (error) {
            console.log(error)
        }
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

            {editMenu ?
                <div className="edit-modal-container-admin">
                    <div className="edit-modal-box-admin">
                        <form ref={editForm} onSubmit={handleSubmit} className="edit-modal-box-admin">
                            <label htmlFor="title">titulo</label>
                            <input type="text" name="title" defaultValue={confirmationValue.title} />
                            <label htmlFor="text">texto</label>
                            <textarea name="text" rows="4" cols="50" className="admin-text-input" defaultValue={confirmationValue.text} />
                    
                            <label htmlFor="difficultLevel">dificuldade</label>
                            <input type="text" name="difficultLevel" defaultValue={confirmationValue.difficultLevel} />
                            <label htmlFor="hashtags">Hashtags</label>
                            <input type="text" name="hashtags" defaultValue={confirmationValue.hashtags.map((hashtag) => hashtag.hashtag)} />
                            <input type="submit" value='enviar' className="button-submit-adminEdit" />
                        </form>
                        <IoMdClose className="close-option" onClick={() =>   toggleEditMenu()} />
                    </div>
                </div> : null}

            {confirmation ? (
                <div className="confirm-container">
                    <div className="confirm-box">
                        <p>{operation === 'aproval' ? 'tem certeza que deseja validar o projeto ?' : 'tem certeza que quer apagar o projeto ?'}</p>
                        <div className="confirm-option">
                            {operation === 'aproval' ?
                                <FaCheck className="accept-option" onClick={() => confirmValidate(confirmationValue)} /> : <FaCheck className="accept-option" onClick={() => confirmDelete(confirmationValue)} />}
                            <IoMdClose className="close-option" onClick={() => toggleConfirmation()} />

                        </div>
                    </div>
                </div>) : null}
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
                                {!isLoading ? <Loading className="loading-data-admin" /> : null}
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