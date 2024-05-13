import * as Yup from "yup";
import { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FetchApi } from "../../utils/Fetch";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ContentEditable from "react-contenteditable";
import "./ideaCard.css";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useUnlog } from "../../utils/Logout";
import { StandbyContext } from "../../context/isStandbyContext";

function IdeaCard({ editable, cards, url }) {

  const [posts, setPosts] = useState([]);
  const [newUrl, setNewUrl] = useState(`/project/${url}?`);
  const [previousUrl, setPreviousUrl] = useState("");
  const [show, setShow] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [editColor, setEditColor] = useState("");
  const [editDifficulty, setEditDifficulty] = useState(1);
  const [errors, setErrors] = useState([]);
  const [requestErros, setRequestErrors] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [hashtagErros, setHashtagErrors] = useState("");
  const headers = useAuthHeader();
  const authUser = useAuthUser();
  const unlogUser = useUnlog();
  const ApiUrl = import.meta.env.VITE_API_URL



  const {standby} = useContext(StandbyContext)

  const cleanToken = headers.replace("x-acess-token", "");

  const handleClose = () => {
    setHashtagErrors("");
    setShow(false);
  };

  const yupValidation = Yup.object({
    title: Yup.string()
      .min(10, "O titulo deve ter pelo menos 10 caracteres ")
      .max(50, "O titulo deve ter no máximo 50 caracteres"),
    text: Yup.string()
      .min(50, "A descrição deve ter pelo menos 50 caracteres")
      .max(1000, "A descrição deve ter no máximo 1000 caracteres"),
    difficultLevel: Yup.number()
      .min(1, "Deve ser um número de 1 a 3")
      .max(3, "deve ser um número de 1 a 3"),
    Postcolor: Yup.string().oneOf(
      ["FFD602", "FF02C7", "02FFD1"],
      "A cor do post deve ser vermelho, azul ou verde"
    ),
  });

  const validateHashtag = (hashtags) => {
    const validatedHashtags = hashtags.every((hashtag) => hashtag.length >= 4);
    return validatedHashtags;
  };

  const handleShow = (post) => {
    setEditPost({ ...post });
    setEditColor(post.postColor);
    setEditDifficulty(post.difficultLevel);
    setIsEditing(false);
    setShow(true);
   
  };

  const handleEdit = (event, post) => {
    event.stopPropagation();
    if (!isEditing) {
      setHashtagErrors(false);
    }
    handleShow(post);
    setIsEditing(true);
  };

  const getData = async () => {
    try {
      const get = await FetchApi(
        "GET",
        `${ApiUrl}${newUrl}`,
        "",
        cleanToken
      );
      if (get.message === "project não encontrado, tente novamente com outros valores!"){
       
        throw "nenhum project";      
      }

   
      const projects = get.projects.filter(
        (project) => !posts.some((post) => post.id === project.id)
      );
     
      setPreviousUrl(get.previousUrl);
      setRequestErrors("");
      if (get.nextUrl !== null) {
        setNewUrl(get.nextUrl);
      }
    
      setPosts((prevPosts) => {
        const uniqueProjects = projects.filter((project) => (
          !prevPosts.some((prevPost) => prevPost.id === project.id)
        ));
        return [...prevPosts, ...uniqueProjects];
      });
    
    } catch (error) {
      if (error.response?.status === 401) {
        unlogUser();
      }

      if(error === "nenhum project"){
          setRequestErrors(true)
      }

     
    }
  };

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout); 
      scrollTimeout = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } =
          document.documentElement;
        if (scrollTop + clientHeight + 1 >= scrollHeight) {
          getData();
        }
      }, 200); 
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout); 
    };
  }, [getData]);

  const handleDelete = async (event, post) => {
    try {
      event.stopPropagation();
      const request = await FetchApi(
        "DELETE",
        `${ApiUrl}/project/delete-my/${post.id}`,
        "",
        cleanToken
      );
      alert("Post deletado com sucesso!");
      setPosts(posts.filter((item) => item.id !== post.id));
    } catch (error) {
      if (error.response?.status === 401) {
        unlogUser();
      }
    }
  };
  const renderStars = (difficulty) => {
    let stars = "";
    for (let i = 0; i < difficulty; i++) {
      stars += "★";
    }
    for (let i = difficulty; i < 3; i++) {
      stars += "☆";
    }
    return stars;
  };

  const handleSave = async () => {
    try {
      editPost.postColor = editColor || editPost.postColor;

      const postData = {
        title: editPost.title || posts.title,
        text: editPost.text || posts.text,
        postColor: editPost.postColor || posts.postColor,
        difficultLevel: editPost.difficultLevel || posts.difficultLevel,
        hashtags: editPost.hashtags || posts.hashtags,
      };

      await yupValidation.validate(postData, { abortEarly: false });
      const data = await FetchApi(
        "PATCH",
        `${ApiUrl}/project/update-my/${editPost.id}`,
        postData,
        cleanToken
      );

      if(!standby){
        setPosts(posts.filter((item) => item.id !== editPost.id));
      }
     
      setErrors([]);

      setHashtagErrors("");
      handleClose();

      setEditPost({});
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        unlogUser();
      }

      if (error === "Hashtag validation failed") {
        return setHashtagErrors(error);
      }
      const newErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        return;
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {requestErros && (
        <div className="error-notFound">
          Nenhum post encontrado, tente rolar a tela até a parte de baixo para
          carregar mais posts
        </div>
      )}
      <Row xs={1} md={cards} className="main">
        {posts.map((post, idx) => (
          <Col
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              onClick={() => handleShow(post)}
              style={{ backgroundColor: `#${post.postColor}` }}
            >
              <Card.Body>
                {editable && (
                  <div>
                    <FaEdit
                      onClick={(event) => handleEdit(event, post)}
                      className="edit"
                    />
                    <FaTrash
                      onClick={(event) => handleDelete(event, post)}
                      className="delete"
                    />
                  </div>
                )}
                <Card.Title>
                  <span className="post-title">{post.title}</span>
                  <span className="star">
                    {renderStars(post.difficultLevel)}
                  </span>
                </Card.Title>
                <Card.Text bsPrefix="text">{post.text}</Card.Text>
                <Card.Text
                  bsPrefix="text2"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post.hashtags.map((hashtag, idx) => (
                    <span key={idx}>{hashtag.hashtag}</span>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal bsPrefix="modal" show={show} onHide={handleClose} animation="true">
        <Modal.Header
          closeButton
          style={{ backgroundColor: `#${editPost?.postColor}` }}
        >
          <Modal.Title>
            {isEditing ? (
              <ContentEditable
                html={editPost?.title || ''}
                onChange={(e) =>
                  setEditPost({ ...editPost, title: e.target.value })
                }
              />
            ) : (
              editPost?.title
            )}
            <span className="star">
              {renderStars(editPost?.difficultLevel)}
            </span>
          </Modal.Title>
        </Modal.Header>
        {errors.title && <div className="error-input-edit">{errors.title}</div>}
        {errors.text && <div className="error-input-edit">{errors.text}</div>}
        <Modal.Body style={{ backgroundColor: `#${editPost?.postColor}` }}>
          {isEditing ? (
            <>
              <h2 className="userName"> Autor : {authUser.name}</h2>
              <ContentEditable
                tagName="p"
                html={editPost?.text || ''}
                onChange={(e) =>
                  setEditPost({ ...editPost, text: e.target.value })
                }
              />
              {hashtagErros && (
                <div className="error-input-edit">
                  As hashtags precisam ter pelo menos 4 caracteres
                </div>
              )}
              <ContentEditable
  tabIndex="p"
  html={
    editPost?.hashtags
      ? editPost.hashtags
          .map((hashtag) => hashtag.hashtag)
          .join(" ")
      : ""
  }
  onChange={(e) => {
    const hashtags = e.target.value
      .split(" ")
      .map((word) => ({ hashtag: word.startsWith("#") ? word : "#" + word }));
    setEditPost({
      ...editPost,
      hashtags: hashtags,
    });
  }}
/>

              <Form.Group
                className="colors"
                onChange={(e) => setEditColor(e.target.value)}
                value={editColor}
                aria-label="cores"
              >
                <Form.Check
                  type="radio"
                  name="color"
                  value="FFD602"
                  label="Amarelo"
                  style={{
                    backgroundColor: "#FFD602",
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
                <Form.Check
                  type="radio"
                  name="color"
                  label="Rosa Neon"
                  value="FF02C7"
                  style={{
                    backgroundColor: "#FF02C7",
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
                <Form.Check
                  type="radio"
                  name="color"
                  label="Azul Neon"
                  value="02FFD1"
                  style={{
                    backgroundColor: "#02FFD1",
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </Form.Group>

              <Form.Select
                className="dificulty"
                onChange={(e) => setEditDifficulty(e.target.value)}
                value={editDifficulty}
                aria-label="Nivel de dificuldade"
              >
                <option>Selecione o nivel de dificuldade</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Form.Select>
            </>
          ) : (
            <>
              <h2 className="userName"> Autor : {editPost?.user.name}</h2>
              <Card.Text bsPrefix="custom-cardText" className="modalText">{editPost?.text}</Card.Text>
              <Card.Text className="modalText">
                {editPost?.hashtags.map((hashtag, idx) => (
                  <span key={idx}>{hashtag.hashtag}</span>
                ))}
              </Card.Text>
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: `#${editPost?.postColor}` }}>
          {isEditing ? (
            <Button
              bsPrefix="save"
              style={{ backgroundColor: "#0E1618" }}
              onClick={handleSave}
            >
              Salvar
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IdeaCard;
