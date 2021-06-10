import axios from "axios";
import React, { useState } from "react";

const PostComments = ({ id }) => {
  const [newComment, setNewComment] = useState({
    commentTitle: "",
    comment: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  let name, value;
  const handleEvent = (e) => {
    name = e.target.name;
    value = e.target.value;

    setNewComment({ ...newComment, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { commentTitle, comment, firstName, lastName, email } = newComment;
    if (!commentTitle || !comment || !firstName || !lastName || !email) {
      setMessage("Please fill all the details");
    } else {
      const response = await axios.post(`http://localhost:3001/comment/${id}`, {
        commentTitle,
        comment,
        firstName,
        lastName,
        email,
      });
      console.log(response.data);
      setMessage(response.data.msg);
      setNewComment({
        commentTitle: "",
        comment: "",
        firstName: "",
        lastName: "",
        email: "",
      });
    }
  };

  return (
    <>
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
      <form className="needs-validation" action="" method="POST" noValidate>
        <div className="row">
          <div className="col-md-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Comment Title"
              aria-label="comment Title"
              name="commentTitle"
              id="commentTitle"
              onChange={handleEvent}
              value={newComment.commentTitle}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <textarea
              name="comment"
              className="form-control"
              id="comment"
              cols="10"
              rows="5"
              onChange={handleEvent}
              value={newComment.comment}
              placeholder="Your Comment..."
              required
            ></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
              name="firstName"
              id="firstName"
              onChange={handleEvent}
              value={newComment.firstName}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
              name="lastName"
              id="lastName"
              onChange={handleEvent}
              value={newComment.lastName}
              required
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control"
              placeholder="Email Addreess"
              aria-label="email"
              name="email"
              id="email"
              onChange={handleEvent}
              value={newComment.email}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={postData}
          className="mb-5 btn btn-dark btn-lg"
        >
          POST COMMENT
        </button>
      </form>
    </>
  );
};

export default PostComments;
