import { useState, useEffect } from "react";
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

function IdeaCard({ editable, cards, url }) {
  const [posts, setPosts] = useState([]);
  const [newUrl, setNewUrl] = useState(`/project/${url}?`)
  const [previousUrl, setPreviousUrl] = useState('')
  const [show, setShow] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [editColor, setEditColor] = useState("");
  const [editDifficulty, setEditDifficulty] = useState(1);
  const [isEditing, setIsEditing] = useState(null);
  const headers = useAuthHeader();
  const authUser = useAuthUser()
  const unlogUser = useUnlog()

  const cleanToken = headers.replace("x-acess-token", "");

  const handleClose = () => setShow(false);

  const handleShow = (post) => {
    setEditPost({ ...post });
    setEditColor(post.postColor);
    setEditDifficulty(post.difficultLevel);
    setIsEditing(false);
    setShow(true);
    console.log(post.id)
  };


  const handleEdit = (event, post) => {
    event.stopPropagation();
    handleShow(post);
    setIsEditing(true);

  };

  const getData = async () => {
    try {

      const get = await FetchApi("GET", `https://banco-de-ideiasapi.up.railway.app${newUrl}`, '', cleanToken)
      console.log(get)
      const projects = get.projects.filter(project => !posts.some(post => post.id === project.id))

      console.log(newUrl)
      setPreviousUrl(get.previousUrl)

      if (get.nextUrl !== null) {
        setNewUrl(get.nextUrl)
      }
      setPosts((prevPosts) => [...prevPosts, ...projects])


    } catch (error) {
      if(error.response.status === 401){
        unlogUser()
    }
    }

  }

  // const handleScroll = () => {
  //   const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  //   const roundedScrollTop = Math.round(scrollTop);
  //   if (roundedScrollTop + clientHeight + 1>= scrollHeight) {
  //       getData();
  //   }

  // }

  // função que carrega mais posts de acordo com a rolagem de barra do usuario, o scrollTop é o tanto que o usuario desceu a barra comparado ao começo,
  // o clientHeight é tamanho que a tela esta visivel no momento, o scrollHeith é o tamanho total da pagina,
  // dai a função handscroll faz o seguinte: se o tanto que o usuario desceu somado ao tamanho visivel da tela for maior ou igual ao tamanho total da pagina ele pega mais dados pois chegou no fim da tela
  // dai tem um event listner ali pra chamar essa função ai sempre que o usuario ir descendo a barra de rolagem e verificar se ele chegou embaixo da tela
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout); // Limpa o timeout anterior
      scrollTimeout = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight + 1 >= scrollHeight) {
          getData();
        }
      }, 200); // Define um atraso de 200ms antes de chamar getData()
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout); // Limpa o timeout ao desmontar o componente
    };
    // window.addEventListener('scroll', handleScroll)
    // return () => {
    //   window.removeEventListener("scroll", handleScroll)
    // }
  }, [getData])

  const handleDelete = async (event, post) => {
    try {
      event.stopPropagation();
      const request = await FetchApi("DELETE", `https://banco-de-ideiasapi.up.railway.app/project/delete-my/${post.id}`, "", cleanToken)
      alert("Post deletado com sucesso!");
      setPosts(posts.filter(item => item.id !== post.id))
    } catch (error) {
      if(error.response.status === 401){
          unlogUser()
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

  const handleSave = () => {
    console.log("esses são os dados do post ", editPost)
    editPost.postColor = editColor || editPost.postColor; 

    const postData = {
      title: editPost.title || posts.title,
      text: editPost.text || posts.text,
      postColor: editPost.postColor || posts.postColor,
      difficultLevel: editPost.difficultLevel || posts.difficultLevel,
      hashtags: editPost.hashtags || posts.hashtags
      
    }
    console.log(postData)

    FetchApi(
      "PATCH",
      `https://banco-de-ideiasapi.up.railway.app/project/update-my/${editPost.id}`,
      postData,
      cleanToken
    );
    try {
      setPosts(
        posts.map((post) => (post.id === editPost.id ? editPost : post))
      );
      handleClose();
      setEditPost({});
    } catch (error) {
      if(error.response.status === 401){
        unlogUser()
    }
    }
  };
  useEffect(() => {
    getData()

  }, []);

  return (
    <>
      <Row xs={1} md={cards} className="main" >
        {posts.map((post, idx) => (
          <Col key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  <span>{post.title}</span>
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
                html={editPost?.title}
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
        <Modal.Body style={{ backgroundColor: `#${editPost?.postColor}` }}>
          {isEditing ? (
            <>
              <h2 className="userName"> Autor : {authUser.name}</h2>
              <ContentEditable
                tagName="p"
                html={editPost?.text}
                onChange={(e) =>
                  setEditPost({ ...editPost, text: e.target.value })
                }
              />
              <ContentEditable
                tabIndex="p"
                html={editPost?.hashtags ? editPost.hashtags.join(" ") : ""}
                onChange={(e) => {
                  const hashtags = e.target.value
                    .split(" ")
                    .map((word) => (word.startsWith("#") ? word : "#" + word));
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
                  value="#FFD602"
                  label="Amarelo"
                  style={{ backgroundColor: "#FFD602" }}
                />
                <Form.Check
                  type="radio"
                  name="color"
                  label="Rosa Neon"
                  value="#FF02C7"
                  style={{ backgroundColor: "#FF02C7" }}
                />
                <Form.Check
                  type="radio"
                  name="color"
                  label="Azul Neon"
                  value="#02FFD1"
                  style={{ backgroundColor: "#02FFD1" }}
                />
              </Form.Group>

              <Form.Select
                className="dificulty"
                onChange={(e) => setEditDifficulty(e.target.value)}
                value={editDifficulty}
                aria-label="Nivel de dificuldade"
              >
                <option>Selecione o nivel de dificuldade</option>
                <option value={1}>
                </option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Form.Select>
            </>
          ) : (
            <>
              <h2 className="userName"> Autor : {editPost?.user.name}</h2>
              <Card.Text className="modalText">{editPost?.text}</Card.Text>
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
