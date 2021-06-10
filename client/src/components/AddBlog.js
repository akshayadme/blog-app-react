import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserContext from "../context/useContext";

const AddBlog = () => {
  const history = useHistory();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    } else {
      return;
    }
    // eslint-disable-next-line
  }, []);

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

  const postData = async (e) => {
    try {
      e.preventDefault();
      const { location, img, img_type, title, quotes, blog } = newBlog;
      if (!location || !img || !img_type || !title || !quotes || !blog) {
        setMessage("Please fill all the details");
      } else {
        const response = await axios.post(
          `http://localhost:3001/blog`,
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
        setNewBlog({
          location: "",
          img: "",
          img_type: "",
          title: "",
          quotes: "",
          blog: "",
        });
      }
    } catch (err) {
      err.response.data.msg && setMessage(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="display-4 my-5">Add New Blog</h1>
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
              onClick={() => setMessage("")}
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

export default AddBlog;
