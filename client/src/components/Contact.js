import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";

const Contact = () => {
  const [alertmessage, setAlertMessage] = useState("");

  const [newMessage, setNewMessage] = useState({
    name: "",
    email: "",
    message: "",
  });

  let name, value;
  const handleEvent = (e) => {
    name = e.target.name;
    value = e.target.value;

    setNewMessage({ ...newMessage, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, message } = newMessage;

    if (!name || !email || !message) {
      setAlertMessage("Please fill all the details");
    } else {
      const response = await axios.post(`http://localhost:3001/contact`, {
        name,
        email,
        message,
      });
      console.log(response.data);
      setAlertMessage(response.data.msg);
      setNewMessage({
        name: "",
        email: "",
        message: "",
      });
    }
  };
  return (
    <>
      <Header heading="GET IN TOUCH" />
      <div className="container contact">
        {alertmessage ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>{alertmessage}</strong>
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
        <form action="/contact" method="POST">
          <div className="row">
            <div className="col-md-6 my-5 d-flex justify-content-center align-items-center">
              <div className="avtar p-3">
                <div>
                  <img
                    src="https://images.pexels.com/photos/4212037/pexels-photo-4212037.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 my-5">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Full NAme"
                  name="name"
                  value={newMessage.name}
                  onChange={handleEvent}
                />
                <label for="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={newMessage.email}
                  onChange={handleEvent}
                  placeholder="Email address"
                />
                <label for="floatingPassword">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="message"
                  name="message"
                  value={newMessage.message}
                  onChange={handleEvent}
                  style={{ height: "120px" }}
                ></textarea>
                <label for="floatingTextarea2">Message</label>
              </div>
              <div className="d-grid gap-2 col-12 mx-auto">
                <button
                  className="btn btn-dark rounded-pill btn-lg"
                  type="submit"
                  onClick={postData}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
