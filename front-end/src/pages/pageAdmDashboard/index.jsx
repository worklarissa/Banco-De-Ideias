
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
import Loading from "../../components/loader";
import { StandbyContext } from "../../context/isStandbyContext";


function PageAdmDashBoard() {
    const { setItems, dataItems, confirmation, toggleConfirmation, confirmationValue, operation, editMenu, toggleEditMenu, dataType, switchDataType } = useContext(AdminDataContext)
    const { page, selectPage } = useContext(StandbyContext)
    const [url, setUrl] = useState('')
    const [offset, setOffset] = useState(0)
    const [path, setPath] = useState('')
    const [limit, setLimit] = useState(5)
    const [nextUrl, setNextUrl] = useState('')
    const [isLoading, setLoadingStop] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [createModal, setCreateModal] = useState(false)
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
        selectPage('admDash')
    }

    const toggleUrl = (key) => {
        setItems([])
        setUrl('')
        setNextUrl('')
        switch (key) {
            case 'valid':
                setTimeout(() => {
                    setPath('all-projects')
                    setUrl('/adm/all-projects')
                }, 100)

                break;

            case 'invalid':
                setTimeout(() => {
                    setPath('invalid-projects')
                    setUrl('/adm/invalid-projects')
                }, 100)

                console.log(url)
                break;

            case 'user':
                setTimeout(() => {
                    setPath('all-users')
                    setUrl('/adm/all-users')
                }, 100)
                break;


            case 'adm':
                setTimeout(() => {
                    setPath('all-adms')
                    setUrl('/adm/all-adms')
                }, 100)
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

            selectPage('')
            signOut()
            navigate('/admin/login')
        } catch (error) {

            console.error(error);
        }
    }

    const handlenextUrl = () => {
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
        setDeleteLoading(true)
        let deleteUrl;
        if (path === 'invalid-projects' || path === 'all-projects') {
            deleteUrl = 'delete-project'
        }

        if (path === 'all-users') {
            deleteUrl = 'delete-user'
        }

        if (path === 'all-adms') {
            deleteUrl = 'delete'
        }
        try {
            const request = await FetchApi(
                "DELETE",
                `${ApiUrl}/adm/${deleteUrl}/${id}`,
                "",
                cleanToken
            );
            console.log(request)

            setItems(dataItems.filter((item) => item.id !== id));

            alert('Deletado com sucesso!')

            if (offset > 0 && nextUrl !== '') {
                setOffset(offset - 1);
                setNextUrl(`/adm/${path}?limit=${limit}&offset=${offset - 1}`);
                console.log(nextUrl)
            } else {
                console.log('caiu no else')
                setOffset(offset);
                setNextUrl(nextUrl);
            }

        } catch (error) {
            console.log(error)
            alert(error.message)
            if (error.response?.status === 401) {
                signOut()
                navigate()
            }
        } finally {
            setDeleteLoading(false)
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
            alert(error.message)
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

            setOffset(request.offset + request.limit)
            setLimit(request.limit)

            if (request.nextUrl !== null) {
                setNextUrl(request.nextUrl);
            }

            if (dataItems.length > 0 && dataType === 'project') {
                return setItems((prevItems) => {
                    const newItems = request.projects.filter(
                        (newItem) => !prevItems.some((item) => item.id === newItem.id)
                    );
                    return [...prevItems, ...newItems];
                });

            }

            if (dataItems.length > 0 && dataType === 'user' || dataType === 'adm') {
                return setItems((prevItems) => {
                    const newItems = request.users.filter(
                        (newItem) => !prevItems.some((item) => item.id === newItem.id)
                    );
                    return [...prevItems, ...newItems];
                });

            }

            if (dataType === 'project') {
                setItems(request.projects)
            } else {
                setItems(request.users)
            }

            console.log(dataItems)


        } catch (error) {
            console.log(error)
        } finally {
            setLoadingStop(true); // Set loading to false
        }


    }

    const handleClick = async (value, type) => {
        switchDataType(type)
        toggleUrl(value)
    }

    const toggleCreateModal = async () => {
        setCreateModal(!createModal)
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        const cleanToken = useHeader.replace("x-acess-token ", "");
        let editObject;
        let pathUpdate;

        if (path === 'invalid-projects' || path === 'all-projects') {
            const title = editForm.current.title.value
            const text = editForm.current.text.value
            const difficultLevel = editForm.current.difficultLevel.value
            const hashtagsString = editForm.current.hashtags.value.replace(/,/g, ' ').trim()
            const hashtags = hashtagsString.split(/\s+/);
            editObject = { title: title, text: text, difficultLevel: difficultLevel, hashtags }
            pathUpdate = "update-project"
            console.log(editObject)
        }


        if (path === 'all-adms') {
            const name = editForm.current.name.value
            const password = editForm.current.password.value
            editObject = { name: name, password: password }
            pathUpdate = "update"
        }

        setDeleteLoading(true)
        try {

            const data = await FetchApi(
                "PATCH",
                `${ApiUrl}/adm/${pathUpdate}/${confirmationValue.id}`,
                editObject,
                cleanToken
            );

            console.log(pathUpdate)
            if (pathUpdate === 'update-project' || pathUpdate === "all-projects") {
                console.log('caiu no project update')
                setItems((prevItems) => {
                    return prevItems.map((item) => {
                        return item.id === data.project.id ? data.project : item
                    })
                })
            }

            if (pathUpdate === 'update') {
                setItems((prevItems) => {
                    return prevItems.map((item) => {
                        return item.id === data.updated.id ? data.updated : item
                    })
                })
            }

            toggleEditMenu('')
            alert('editado com sucesso!')

        } catch (error) {
            alert(error.message)
            console.log(error)
        } finally {
            setDeleteLoading(false)
        }
    }


    const handleSubmitCreate = async (e) => {
        e.preventDefault()
        const cleanToken = useHeader.replace("x-acess-token ", "");
        const name = editForm.current.name.value
        const password = editForm.current.password.value
        const editObject = { name: name, password: password }

        setDeleteLoading(true)
        try {

            const data = await FetchApi(
                "POST",
                `${ApiUrl}/adm/create`,
                editObject,
                cleanToken
            );

            console.log(data)

            setItems((prevItems) => [...prevItems, data.adm]);

            if (nextUrl !== '') {
                setOffset(offset + 1);
                setNextUrl(`/adm/${path}?limit=${limit}&offset=${offset + 1}`);
                console.log(nextUrl)
            } else {
                console.log('caiu no else')
                setOffset(offset);
                setNextUrl(nextUrl);
            }

            toggleCreateModal('')
            alert('criado com sucesso!')

        } catch (error) {
            alert(error.message)
            console.log(error)
        } finally {
            setDeleteLoading(false)
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

            {editMenu === 'project' ?
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
                            <input type="submit" value='enviar' className="button-submit-adminEdit" disabled={deleteLoading} />
                        </form>
                        <IoMdClose className="close-option" onClick={() => toggleEditMenu('')} />
                    </div>
                </div> : null}

            {editMenu === 'adm' ?
                <div className="edit-modal-container-admin">
                    <div className="edit-modal-box-admin">
                        <form ref={editForm} onSubmit={handleSubmit} className="edit-modal-box-admin">
                            <label htmlFor="title">nome</label>
                            <input type="text" name="name" defaultValue={confirmationValue.name} />
                            <label htmlFor="text">senha</label>
                            <input type="text" name="password" defaultValue={confirmationValue.password} />
                            <input type="submit" value='enviar' className="button-submit-adminEdit" disabled={deleteLoading} />
                        </form>
                        <IoMdClose className="close-option" onClick={() => toggleEditMenu('')} />
                    </div>
                </div> : null}

            {createModal ?
                <div className="edit-modal-container-admin">
                    <div className="edit-modal-box-admin">
                        <form ref={editForm} onSubmit={handleSubmitCreate} className="edit-modal-box-admin">
                            <label htmlFor="title">nome</label>
                            <input type="text" name="name" />
                            <label htmlFor="text">senha</label>
                            <input type="text" name="password" />
                            <input type="submit" value='enviar' className="button-submit-adminEdit" disabled={deleteLoading} />
                        </form>
                        <IoMdClose className="close-option" onClick={() => toggleCreateModal()} />
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
                                <button className="change-operation" disabled={!isLoading} onClick={() => handleClick('invalid', 'projects')}>Ideias invalidas</button>
                                <button className="change-operation" disabled={!isLoading} onClick={() => handleClick('valid', 'projects')}>Todas as ideias</button>
                                <button className="change-operation" disabled={!isLoading} onClick={() => handleClick('user', 'users')}>Todos os usuários</button>
                                <button className="change-operation" disabled={!isLoading} onClick={() => handleClick('adm', 'adms')}>Todos os adms</button>
                            </div>


                            <div className="itens-adm-box">
                                {deleteLoading ? <Loading /> : <DataCard />}
                                {!isLoading ? <Loading className="loading-data-admin" /> : null}
                            </div>
                            <div className="btn-div-adm">
                                <button className="load-more-adm" onClick={() => handlenextUrl()}>Carrega Mais</button>
                                {path && path === 'all-adms' ? <button type="button" onClick={toggleCreateModal}>Criar Adm</button> : null}
                            </div>
                        </div>

                    </div>

                </Container>
            )}

        </>
    )
}

export default PageAdmDashBoard