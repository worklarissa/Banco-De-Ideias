import * as Yup from 'yup'
import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import "./form.css";
import { FetchApi } from "../../utils/Fetch";
import {toast } from 'react-toastify'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";


export const IdeaForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [difficultyLevel, setDifficulty] = useState("");
  const [Postcolor, setColor] = useState("");
  const [errors, setErrors] = useState([])
  const [hashtagErros, setHashtagErrors] = useState('')
  const headers = useAuthHeader();
  const Token = headers.replace('x-acess-token', '')
  const ApiUrl = import.meta.env.VITE_API_URL

  const handleHashtagsChange = (event) => {
    const value = event.target.value
      .split(" ")
      .map((word) => (word.startsWith("#") ? word : "#" + word));
    setHashtags(value);
  };

  const yupValidation = Yup.object({
    title: Yup.string().required('Preencha Este Campo!').min(10, "O titulo deve ter pelo menos 10 caracteres ").max(50, "O titulo deve ter no máximo 50 caracteres"),
    text: Yup.string().required('Preencha Este Campo!').min(50, "A descrição deve ter pelo menos 50 caracteres").max(1000, "A descrição deve ter no máximo 1000 caracteres"),
    difficultLevel: Yup.number().required('Preencha Este Campo!').min(1, "Deve ser um número de 1 a 3").max(3, "deve ser um número de 1 a 3"),
    Postcolor: Yup.string().required('Preencha Este Campo').oneOf(['FFD602', 'FF02C7', '02FFD1'], 'A cor do post deve ser vermelho, azul ou verde')
  })

  const validateHashtag = (hashtags) => {

    const validatedHashtags = hashtags.every(hashtag => hashtag.length >= 4)
    return validatedHashtags
  }

  const notifyCreated = () =>{toast.success('post criado com sucesso!')}

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        title: title,
        text: description,
        hashtags: hashtags,
        difficultLevel: difficultyLevel,
        Postcolor: Postcolor,
      };

      const request = await FetchApi("POST", `${ApiUrl}/project/create`, formData, Token);

      

      setErrors([])
      setHashtagErrors('')
      setTitle('')
      setDescription('')
      setColor('')
      setDifficulty('')
      setHashtags([])
      notifyCreated()
      event.target.reset()
    } catch (error) {
      if (error === "Hashtag validation failed") {
        return setHashtagErrors(error)
      }

      const newErrors = {}

      if (error.inner) {
        error.inner.forEach(err => {
          newErrors[err.path] = err.message
        })

        return setErrors(newErrors)
      }

    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form">

      {errors.title && <div className='error-input-create'>{errors.title}</div>}
      <FloatingLabel controlId="title" label="Título" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          required
        />
      </FloatingLabel>
      {errors.text && <div className='error-input-create'>{errors.text}</div>}
      <FloatingLabel controlId="description" label="Descrição" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Descrição"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          required
        />
      </FloatingLabel>
      {hashtagErros && <div className='error-input-create'>As hashtags precisam ter pelo menos 4 caracteres, deve haver pelo menos 1 tecnologia recomendada para o projeto</div>}
      <FloatingLabel controlId="hashtags" label="Hashtags" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Hashtags"
          value={hashtags.join(" ")}
          onChange={handleHashtagsChange}
          className="input"
        />
      </FloatingLabel>
      {errors.difficultLevel && <div className='error-input-create'>{errors.difficultLevel}</div>}
      <Form.Select
        aria-label="Nível de Dificuldade"
        value={difficultyLevel}
        onChange={(e) => setDifficulty(e.target.value)}
        className="input"
        required
      >
        <option value="">Selecione...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Form.Select>

      <Form.Group controlId="color" className="cores">
        {errors.postColor && <div className='error-input-create'>{errors.postColor}</div>}
        <Form.Label>Cores :</Form.Label>
        <div className="radios">
          <Form.Check
            type="radio"
            id="colorYellow"
            name="color"
            value="FFD602"
            style={{
              backgroundColor: "#FFD602",
              width: "1.7rem",
              height: "1.7rem",
              borderRadius: "50%",
            }}
            onChange={(e) => setColor(e.target.value)}
          />
          <Form.Check
            type="radio"
            name="color"
            id="colorCyan"
            value="02FFD1"
            style={{
              backgroundColor: "#02FFD1",
              width: "1.7rem",
              height: "1.7rem",
              borderRadius: "50%",
            }}
            onChange={(e) => setColor(e.target.value)}
          />
          <Form.Check
            type="radio"
            name="color"
            id="colorMagenta"
            value="FF02C7"
            style={{
              backgroundColor: "#FF02C7",
              width: "1.7rem",
              height: "1.7rem",
              borderRadius: "50%",
            }}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </Form.Group>

      <Button type="submit" className="salvar">
        Criar
      </Button>
    </Form>
  );
};