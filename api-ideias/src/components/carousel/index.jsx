import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { FetchApi } from "../../utils/Fetch";

function IdeaCarousel({ url }) {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1);

  const loadPosts = () => {
    FetchApi("GET", `${url}?page=${page}`, "", null).then((data) => {
      if (Array.isArray(data.projects)) {
        setPosts(data.projects);
        setAllPosts((prevPosts) => [...prevPosts, ...data.projects]);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.error("Data is not an array:", data);
      }
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSelect = (selectedIndex, e) => {
    if (
      selectedIndex === allPosts.length - 1 &&
      selectedIndex !== posts.length - 1
    ) {
      setPosts(allPosts[selectedIndex]);
    } else if (selectedIndex === posts.length - 1) {
      loadPosts();
    }
  };

  
  const groupedPosts = posts.reduce((grouped, post, index) => {
    const groupIndex = Math.floor(index / 3);

    if (!grouped[groupIndex]) {
      grouped[groupIndex] = [];
    }

    grouped[groupIndex].push(post);

    return grouped;
  }, []);

  return (
    <Carousel onSelect={handleSelect}>
      {groupedPosts.map((group, idx) => (
        <Carousel.Item key={idx}>
          <div className="d-flex justify-content-around">
            {group.map((post, idx) => (
              <Card
                key={idx}
                style={{ backgroundColor: "#" + post.postColor, flex: 1 }}
              >
                <Card.Body style={{ backgroundColor:  post.postColor, flex: 1 }}>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.text}</Card.Text>
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
