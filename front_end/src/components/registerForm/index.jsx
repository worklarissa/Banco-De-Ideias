import * as Yup from "yup";
import { useState, useRef } from "react";
import { FetchApi } from "../../utils/Fetch";
import { useNavigate } from "react-router-dom";
import eye from "../../assets/eyeSvg.svg";

import "./register.css";

function RegisterForm() {
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const registerForm = useRef(null);
  const navigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_API_URL

  const yupValidation = Yup.object({
    name: Yup.string().required("Preencha Este Campo!"),
    email: Yup.string()
      .email("email invalido")
      .required("Preencha Este Campo!"),
    password: Yup.string()
      .required("Preencha Este Campo!")
      .min(8, "a senha deve ter pelo menos 8 caracteres")
      .matches(/[!@#$%^&*]/, "a senha deve conter pelo menos um símbolo")
      .matches(/[1-9]/, "a senha deve conter pelo menos um número")
      .matches(
        /[a-z]/,
        "a senha deve conter uma letra maiuscula e uma letra minuscula"
      )
      .matches(
        /[A-Z]/,
        "a senha deve conter uma letra maiuscula e uma letra minuscula"
      ),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${ApiUrl}/user/create`;
    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password = registerForm.current.password.value;
    const userInfo = { name, email, password };

    try {
      await yupValidation.validate(userInfo, { abortEarly: false });
       await FetchApi("POST", url, userInfo);


      setErrors([]);
      alert("Conta criada com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {

      const newErrors = {};

      if(error?.response.data){
        let errorsArray = error.response.data?.error
        errorsArray.forEach((err) =>{
           newErrors[err.path] = err.message
        })
        return setErrors(newErrors)
      }

      if (error.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        return setErrors(newErrors);
      }
    }
  };
  return (
    <div className="register-form-box">
      <form
        ref={registerForm}
        onSubmit={handleSubmit}
        className="form-register-container"
      >
        <div className="input-register">
          <label>Nome</label>
          {errors.name && (
            <div className="error-input-register">{errors.name}</div>
          )}
          <input type="text" name="name" />
        </div>

        <div className="input-register">
          <label>Email</label>
          {errors.email && (
            <div className="error-input-register">{errors.email}</div>
          )}
          <input type="text" name="email" />
        </div>

        <div className="input-register">
          <label>Senha</label>
          {errors.password && (
            <div className="error-input-register">{errors.password}</div>
          )}
          <input type={showPassword ? "text" : "password"} name="password" />
          <div className="show-password">
            <img
              src={eye}
              alt="mostra"
              onClick={togglePasswordVisibility}
              className="toggle-password"
            />
            <p>mostra senha</p>
          </div>
        </div>
        
        <div className="send-register">
          <input type="submit" value="register" className="button-submit" />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
