import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import "./form.css";
import { FetchApi } from "../../utils/Fetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const IdeaForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [difficultyLevel, setDifficulty] = useState("");
  const [Postcolor, setColor] = useState("");
  const headers = useAuthHeader();
  const Token = headers.replace('x-acess-token','')

  const handleHashtagsChange = (event) => {
    const value = event.target.value
      .split(" ")
      .map((word) => (word.startsWith("#") ? word : "#" + word));
    setHashtags(value);
  };

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


      const request = await FetchApi("POST", "https://banco-de-ideiasapi.up.railway.app/project/create", formData,Token);

      console.log(request)
      alert("Ideia criada com sucesso!");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
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

      <FloatingLabel controlId="hashtags" label="Hashtags" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Hashtags"
          value={hashtags.join(" ")}
          onChange={handleHashtagsChange}
          className="input"
        />
      </FloatingLabel>

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
        <Form.Label>Cores :</Form.Label>
        <div className="radios">
          <Form.Check
            type="radio"
            id="colorYellow"
            name="color"
            value="#FFD602"
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
            value="#02FFD1"
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
            value="#FF02C7"
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