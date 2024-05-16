import * as Yup from 'yup'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useState, useRef } from "react"
import { FetchApi } from "../../utils/Fetch"
import {useNavigate } from "react-router-dom";
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import eye from "../../assets/eyeSvg.svg"

import "./login.css"



function LoginForm() {
    const [errors, setErrors] = useState([])
    const [requestError, setRequestErrors] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const loginForm = useRef(null)
    const signIn = useSignIn()
    const navigate = useNavigate()
    const ApiUrl = import.meta.env.VITE_API_URL

    const notify = () =>{toast.success('Logado com sucesso!')}
    const notifyError = () =>{toast.error('Usuário não encontrado!')}

    const yupValidation = Yup.object({
        email: Yup.string().required('Preencha este Campo!'),
        password: Yup.string().required('Preencha Este Campo!')

    })

    const handleTogglePassword = () =>{
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `${ApiUrl}/user/login`
        const email = loginForm.current.email.value
        const password = loginForm.current.password.value
        const userInfo = { email, password }
        try {
            await yupValidation.validate( userInfo, { abortEarly: false })
            const request = await FetchApi('POST', url, userInfo)

         
            console.log(request)
            notify()
            signIn({
                auth: {
                    token: request.result.token,
                    type: "x-acess-token"
                },
                userState: {
                    name: request.result.name,
                    uid: request.result.id,
                    numberOfIdeas:request.result.ideasNumber
                }
            })

            setErrors([])
            setRequestErrors('')
            navigate('/perfil')
            
        } catch (error) {
            const newErrors = {}
            setErrors([])
            setRequestErrors('')
            if(error?.response?.status === 401){
                notifyError()
               return setRequestErrors('Usuário não encontrado')
            } 
         

            if (error.inner) {
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message
                })

                return setErrors(newErrors)
            }
           
        }


    }

    return (
        <div className="login-form-box">
            <form ref={loginForm} onSubmit={handleSubmit} className="form-login-container">
                 {requestError && <div className='error-input-register'>{requestError}</div>}
                <div className="input-login">
                    <label>Email</label>
                    {errors.email && <div className='error-input-register'>{errors.email}</div>}
                    <input type="text" name="email" />
                </div>

                <div className="input-login">
                    <label>Senha</label>
                    {errors.password && <div className='error-input-register'>{errors.password}</div>}
                    <input type={showPassword ? 'text': 'password'} name="password" />
                    <div className='show-password'>
                        <img src={eye} alt="mostra" onClick={handleTogglePassword} className='toggle-password'/>
                        <p>mostra senha</p>

                    </div>

                </div>

                <div className="send-login">
                    <input type="submit" value='login' className="button-submit" />
                </div>

            </form>
        </div>
    )
}

export default LoginForm