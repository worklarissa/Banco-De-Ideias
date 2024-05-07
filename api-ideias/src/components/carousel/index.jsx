import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Card from "react-bootstrap/Card";
import { FetchApi } from "../../utils/Fetch";

function IdeaCarousel({ url }) {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1);

  const loadPosts = () => {
    FetchApi("GET", `${url}?page=${page}`, "", null).then((data) => {
      setPosts(data);
      setAllPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSelect = (selectedIndex) => {
    if (selectedIndex === allPosts.length - 1 && selectedIndex !== posts.length - 1) {
      setPosts(allPosts[selectedIndex]);
    } else if (selectedIndex === posts.length - 1) {
      loadPosts();
    }
  };

  return (
    <Carousel onSelect={handleSelect}>
      {posts.map((post, idx) => (
        <Carousel.Item key={idx}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {post.map((item, index) => (
              <Card key={index} style={{ backgroundColor: item.postColor, flex: 1 }}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.text}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default IdeaCarousel;
