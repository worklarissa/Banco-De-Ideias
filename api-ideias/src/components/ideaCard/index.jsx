import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FetchApi } from "../../utils/Fetch";
import "./ideaCard.css";

function IdeaCard({ url }) {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#FFD602");

  const handleClose = () => setShow(false);
  const handleShow = (post) => {
    setCurrentPost(post);
    setShow(true);
  };

  useEffect(() => {
    FetchApi("GET", { url }, "", null).then((data) => {
      setPosts([data]);
      setBackgroundColor([data.colors]);
    });
  }, []);

  return (
    <>
      <Row xs={1} md={4} className="g-4">
        {posts.map((post, idx) => (
          <Col key={idx}>
            <Card
              onClick={() => handleShow(post)}
              style={{ backgroundColor: backgroundColor }}
            >
              <Card.Body>
                <Card.Title>
                  <span>
                    {post.name} projeto para treinar javascript e java
                  </span>
                  <span className="star">★★☆</span>
                </Card.Title>
                <Card.Text>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                  harum esse, voluptatum minima provident rem suscipit possimus
                  molestiae, accusamus dignissimos repellendus placeat assumenda
                  nisi explicabo veniam, corrupti perspiciatis labore alias.
                </Card.Text>
                <Card.Text>{post.species} #javascript csss</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        animation="true"
        style={{ backgroundColor: backgroundColor }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPost?.name}
            projeto para treinar javascript e java
            <span className="star">★★☆</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Status: {currentPost?.status} Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Omnis at vero amet illum! Eveniet
            nostrum accusamus mollitia quaerat dolores laudantium aut cum ipsam?
            Numquam eos nisi atque dolorem officiis fugiat.
          </p>
          <p>Espécie: {currentPost?.species}javascript# </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
            onClick={handleClose}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IdeaCard;
