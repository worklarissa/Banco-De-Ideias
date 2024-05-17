import { useState } from "react"
import { useRef } from "react"
import { FetchApi } from "../../utils/Fetch"
import eye from "../../assets/eyeSvg.svg"
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import "./admLogin.css"
import { useNavigate } from "react-router-dom";



function AdmLoginForm() {
    const [showPassword, setShowPassword] = useState()
    const [error, setError] = useState(false)
    const ApiUrl = import.meta.env.VITE_API_URL
    const url = `${ApiUrl}/adm/login`
    const signIn = useSignIn()
    const loginForm = useRef(null)
    const navigate = useNavigate()

    const toggleShowPassword = () =>{
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const name = loginForm.current.name.value
        const password = loginForm.current.password.value
        const admObject = {
            name: name,
            password: password
        }
        console.log(admObject)

        try {
            const request = await FetchApi('POST', url, admObject)

            signIn({
                auth: {
                    token: request.result.token,
                    type: "x-acess-token"
                },
                userState: {
                    name: request.result.name,
                    uid: request.result.id,
                    role:request.result.role
                }
            })

             setError(false)
             navigate('/admin/dashboard')
        } catch (error) {

            setError(true)
        }

    }

    return (
        <>
            <form ref={loginForm} onSubmit={handleSubmit} className="form-adm-login">
                
            {error && <p className="adm-not-found">Adm não encontrado!</p>}
                <label>Nome</label>
                <input type="text" name="name" />

                <label>Senha</label>
                <input type={showPassword ? 'text' : 'password'} name="password" />
                <div className='show-password'>
                    <img src={eye} alt="mostra" onClick={toggleShowPassword} className='toggle-password' />
                    <p>mostra senha</p>
                </div>
                <input type="submit" value='login' className="button-submit-adm" />
                  

        
                    
            </form>
        </>
    )
}

export default AdmLoginForm