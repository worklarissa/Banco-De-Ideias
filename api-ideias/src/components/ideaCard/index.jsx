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

function IdeaCard({ url, editable, cards }) {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [editColor, setEditColor] = useState("");
  const [editDifficulty, setEditDifficulty] = useState(1);
  const [isEditing, setIsEditing] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (post) => {
    setEditPost({ ...post });
    setEditColor(post.postColor);
    setEditDifficulty(post.difficultyLevel);
    setIsEditing(false);
    setShow(true);
  };

  const handleEdit = (event, post) => {
    event.stopPropagation();
    handleShow(post);
    setIsEditing(true);
  };

  const handleDelete = (event, post) => {
    event.stopPropagation();
    FetchApi("DELETE", `http://delete/${post.id}`, "", null)
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
    console.log(editPost);
    FetchApi("PUT", `https://project/update/${editPost.id}`, "", editPost);
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
    FetchApi("GET", { url }, "", null).then((data) => {
      setPosts([
        {
          id: 1,
          title: "Projeto criar sua identidade em java",
          text: "Através deste projeto eu te ensino a criar um backend perfeito em java tudo sem você precisar saber muito!",
          difficultyLevel: 2,
          postColor: "#02FFD1",
          hashtags: [
            "#java",
            "#Javascript",
            "#Teste",
            "#Javascript",
            "#Javascript",
          ],
        },
        {
          id: 2,
          title: "Projeto criar sua identidade em java",
          text: "Através deste projeto eu te ensino a criar um backend perfeito em java tudo sem você precisar saber muito!",
          difficultyLevel: 3,
          postColor: "#FF02C7",
          hashtags: [
            "#java",
            "#Javascript",
            "#Teste",
            "#Javascript",
            "#Javascript",
            "#Javascript",
            "#Javascript",
          ],
        },
        {
          id: 3,
          title: "Projeto criar sua identidade em java",
          text: "Através deste projeto eu te ensino a criar um backend perfeito em java tudo sem você precisar saber muito!",
          difficultyLevel: 1,
          hashtags: [
            "#java",
            "#Javascript",
            "#Teste",
            "#Javascript",
            "#Javascript",
            "#Javascript",
            "#Javascript",
            "#Javascript",
          ],
        },
      ]);
    });
  }, []);

  return (
    <>
      <Row xs={1} md={cards} className="g-4">
        {posts.map((post, idx) => (
          <Col key={idx}>
            <Card
              onClick={() => handleShow(post)}
              style={{ backgroundColor: post.postColor }}
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
                    {renderStars(post.difficultyLevel)}
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
                  {post.hashtags}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal bsPrefix="modal" show={show} onHide={handleClose} animation="true">
        <Modal.Header
          closeButton
          style={{ backgroundColor: editPost?.postColor }}
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
              {renderStars(editPost?.difficultyLevel)}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: editPost?.postColor }}>
          {isEditing ? (
            <>
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
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Form.Select>
            </>
          ) : (
            <>
              <Card.Text bsPrefix="text">{editPost?.text}</Card.Text>
              <Card.Text bsPrefix="text2">{editPost?.hashtags}</Card.Text>
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: editPost?.postColor }}>
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
