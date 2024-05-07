import * as Yup from 'yup'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useState, useRef } from "react"
import { FetchApi } from "../../utils/Fetch"
import {useNavigate } from "react-router-dom";

import "./login.css"



function LoginForm() {
    const [errors, setErrors] = useState([])

    const loginForm = useRef(null)
    const signIn = useSignIn()
    const navigate = useNavigate()

    const yupValidation = Yup.object({
        email: Yup.string().required('Preencha este Campo!'),
        password: Yup.string().required('Preencha Este Campo!')

    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = 'https://banco-de-ideiasapi.up.railway.app/user/login'
        const email = loginForm.current.email.value
        const password = loginForm.current.password.value
        const userInfo = { email, password }
        try {
            await yupValidation.validate(userInfo, { abortEarly: false })
            const request = await FetchApi('Post', url, userInfo)

            console.log(request.result)

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
            navigate('/perfil')
            
        } catch (error) {
            const newErrors = {}

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
                <div className="input-login">
                    <label>Email</label>
                    {errors.email && <div className='error-input-register'>{errors.email}</div>}
                    <input type="text" name="email" />
                </div>

                <div className="input-login">
                    <label>Senha</label>
                    {errors.password && <div className='error-input-register'>{errors.password}</div>}
                    <input type="password" name="password" />

                </div>

                <div className="send-login">
                    <input type="submit" value='login' className="button-submit" />
                </div>

            </form>
        </div>
    )
}

export default LoginForm