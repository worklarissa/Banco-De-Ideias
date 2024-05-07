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
import useAuthUser from "react-auth-kit/hooks/useAuthHeader";

function IdeaCard({ editable, cards }) {
  const [posts, setPosts] = useState([]);
  const [reqInfo, setReqInfos] = useState({});
  const [newUrl, setNewUrl] = useState("/project/show-valid?limit=6&offset=0");
  const [show, setShow] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [editColor, setEditColor] = useState("");
  const [editDifficulty, setEditDifficulty] = useState(1);
  const [isEditing, setIsEditing] = useState(null);
  const headers = useAuthHeader();
  const authUser = useAuthUser();
  const cleanToken = headers ? headers.replace("x-acess-token", "") : "";

  const handleClose = () => setShow(false);

  const handleShow = (post) => {
    setEditPost({ ...post });
    setEditColor(post.postColor);
    setEditDifficulty(post.difficultLevel);
    setIsEditing(false);
    setShow(true);
    console.log(post.postColor);
  };

  const handleShowMoreButton = () => {
    console.log(newUrl);
    getData();
  };

  const handleEdit = (event, post) => {
    event.stopPropagation();
    handleShow(post);
    setIsEditing(true);
  };

  const getData = async () => {
    const get = await FetchApi(
      "GET",
      `https://banco-de-ideiasapi.up.railway.app${newUrl}`
    );
    const projects = get.projects;
    console.log(get.nextUrl);

    console.log(posts);
    setPosts(projects);
  };

  const handleDelete = (event, post) => {
    event.stopPropagation();
    FetchApi("DELETE", `http://delete/${post.id}`, "", cleanToken)
      .then(() => {
        alert("Projeto deletado com sucesso!");
        setPosts(posts.filter((p) => p.id !== post.id));
      })
      .catch((error) => {
        console.error("Erro ao deletar o post:", error);
      });
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
    FetchApi(
      "PATCH",
      `https://project/update/${editPost.id}`,
      editPost,
      cleanToken
    );
    try {
      setPosts(
        posts.map((post) => (post.id === editPost.id ? editPost : post))
      );
      handleClose();
      setEditPost({});
    } catch (error) {
      console.error("Erro ao salvar o post:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Row xs={1} md={cards} className="main">
        {posts.map((post, idx) => (
          <Col key={idx}>
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
                    .
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
              <h2 className="userName"> Autor: {authUser}</h2>
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
                  1como alterar o layout do telcado no ubuntu
                </option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Form.Select>
            </>
          ) : (
            <>
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
