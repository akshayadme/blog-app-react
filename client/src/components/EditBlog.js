import React, { useState } from "react";
import axios from "axios";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { useEffect, useContext } from "react";
import UserContext from "../context/useContext";

const EditBlog = () => {
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const source = axios.CancelToken.source();

  const [newBlog, setNewBlog] = useState({
    location: "",
    img: "",
    img_type: "",
    title: "",
    quotes: "",
    blog: "",
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const [message, setMessage] = useState("");

  let name, value;
  const handleEvent = (e) => {
    name = e.target.name;
    value = e.target.value;

    setNewBlog({ ...newBlog, [name]: value });
  };

  let { id } = useParams();
  const getData = async () => {
    const response = await axios.get(`http://localhost:3001/edit/${id}`);

    const blogData = response.data.getBlog;
    const { location, img, img_type, title, quotes, blog } = blogData;
    setNewBlog({ location, img, img_type, title, quotes, blog });
  };
  useEffect(() => {
    getData();
    if (!userData.user) {
      history.push("/login");
    } else {
      return;
    }

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line
  }, []);

  const postData = async (e) => {
    e.preventDefault();
    const { location, img, img_type, title, quotes, blog } = newBlog;
    if (!location || !img || !img_type || !title || !quotes || !blog) {
      setMessage("Please fill all the details");
    } else {
      const response = await axios.patch(
        `http://localhost:3001/edit/${id}`,
        {
          location,
          img,
          img_type,
          title,
          quotes,
          blog,
        },
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      setMessage(response.data.msg);
      history.push(`/blog/${id}`);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="display-4 my-5">Edit Blog</h1>
        {message ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>{message}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : (
          ""
        )}
        <Form validated={validated} noValidate onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="">
            <Form.Label column sm={2}>
              Travelled Location
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="location"
                value={newBlog.location}
                onChange={handleEvent}
                placeholder="Location"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="">
            <Form.Label column sm={2}>
              Image URL
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="img"
                value={newBlog.img}
                onChange={handleEvent}
                placeholder="Image URL"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="">
            <Form.Label column sm={2}>
              Image Type (Landscape/Portrait)
            </Form.Label>
            <Col sm={10}>
              <select
                id="img_type"
                className="form-select"
                name="img_type"
                value={newBlog.img_type}
                onChange={handleEvent}
                required
              >
                <option value="">Choose...</option>
                <option value="Landscape">Landscape</option>
                <option value="Portrait">Portrait</option>
              </select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="">
            <Form.Label column sm={2}>
              Blog Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleEvent}
                placeholder="Title"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="">
            <Form.Label column sm={2}>
              Any Quotes you have
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="quotes"
                value={newBlog.quotes}
                onChange={handleEvent}
                placeholder="Quotes"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="">
            <Form.Label column sm={2}>
              Blog
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows={15}
                placeholder="Your Blog Here..."
                name="blog"
                value={newBlog.blog}
                onChange={handleEvent}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" onClick={postData}>
                Post Blog
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default EditBlog;
