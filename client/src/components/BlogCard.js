import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Card, CardColumns } from "react-bootstrap";

const BlogCard = (props) => {
  let [allBlog, setAllBlog] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001");
      const getData = response.data.blogDetails;
      setAllBlog(getData);
    } catch (error) {
      console.log(error);
    }
  };

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const shuffledPosts = shuffleArray(allBlog);

  return (
    <>
      <div className="container allblogs my-5">
        <h1 className="text-center my-5">My Blogs</h1>

        <CardColumns>
          {shuffledPosts.map((value, i) => {
            return value.counter % 3 === 0 ? (
              <>
                <Card key={value._id}>
                  <div className="my-5 text-center">
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <Card.Body>
                    <Card.Title>{value.location}</Card.Title>
                    <Card.Text>{value.quotes}</Card.Text>
                    <footer className="blockquote-footer">
                      <small className="text-muted">
                        <cite title="Source Title">Akshay Adme</cite>
                      </small>
                    </footer>
                  </Card.Body>
                </Card>
              </>
            ) : value.img_type === "Landscape" ? (
              <>
                <NavLink
                  to={`/blog/${value._id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card key={value._id}>
                    <Card.Img variant="top" src={value.img} />
                    <Card.Body>
                      <Card.Title>{value.location}</Card.Title>
                      <Card.Text>{value.blog.substring(0, 50)}</Card.Text>
                    </Card.Body>
                  </Card>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to={`/blog/${value._id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card key={value._id}>
                    <Card.Img variant="top" src={value.img} />
                    <Card.Body>
                      <Card.Title>{value.location}</Card.Title>
                      <Card.Text>{value.blog.substring(0, 50)}</Card.Text>
                    </Card.Body>
                  </Card>
                </NavLink>
              </>
            );
          })}
        </CardColumns>
      </div>
    </>
  );
};

export default BlogCard;
