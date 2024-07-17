import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { FetchApi } from "../../utils/Fetch";
import "./carousel.css";
import Loading from "../loader";

function IdeaCarousel({ url }) {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerSlide, setItemsPerSlide] = useState(null);

  const loadPosts = () => {
    FetchApi("GET", `${url}?page=${page}`, "", null).then((data) => {
      if (Array.isArray(data.projects)) {
        setPosts(data.projects);
        setAllPosts((prevPosts) => [...prevPosts, ...data.projects]);
        setPage((prevPage) => prevPage + 1);
        setRemoveLoading(true);
      } else {
        console.error("Data is not an array:", data);
      }
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    const updateItemsPerWidth = () => {
      const width = window.innerWidth;
      const items =
        width < 320
          ? 1
          : width <= 540
          ? 2
          : width <= 768
          ? 3
          : width >= 992
          ? 4
          : 3;
      setItemsPerSlide(items);
    };

    window.addEventListener("resize", updateItemsPerWidth);
    updateItemsPerWidth();
    return () => window.removeEventListener("resize", updateItemsPerWidth);
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
    const groupIndex = Math.floor(index / itemsPerSlide);

    if (!grouped[groupIndex]) {
      grouped[groupIndex] = [];
    }

    grouped[groupIndex].push(post);

    return grouped;
  }, []);

  return (
    <>
      {!removeLoading && <Loading />}
      <Carousel onSelect={handleSelect}>
        {groupedPosts.map((group, idx) => (
          <Carousel.Item key={idx}>
            <div className=" carousel d-flex justify-content-around">
              {group.map((post, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: "#" + post.postColor }}
                  className="card-carousel"
                >
                  <div style={{ backgroundColor: post.postColor, flex: 1 }}>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.text}</Card.Text>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default IdeaCarousel;
