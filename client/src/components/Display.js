import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import Header from "./Header";
import Comments from "./Comments";
import PostComments from "./PostComments";
import { NavLink } from "react-router-dom";
import UserContext from "../context/useContext";

const Display = () => {
  const { userData } = useContext(UserContext);
  const source = axios.CancelToken.source();

  let { id } = useParams();
  let history = useHistory();

  let [blogs, setblogs] = useState([]);
  let [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/blog/${id}`);
      const getData = response.data.foundBlog;
      setblogs(getData);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    try {
      await axios.delete(`http://localhost:3001/blog/${id}/delete`, {
        headers: { "x-auth-token": userData.token },
      });
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();

    return () => {
      source.cancel();
    };
  });

  return (
    <>
      {loading ? (
        <>
          <Header heading="TRAVELLED DESTIONATION" />

          {userData.user ? (
            <>
              <div className="icon-bar d-flex flex-column">
                <NavLink to={`/edit/${blogs._id}`} className="btn btn-primary">
                  <i className="far fa-edit"></i>
                </NavLink>
                <button
                  type="submit"
                  onClick={deleteBlog}
                  className="btn btn-danger"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="container blogs">
            <div className="row">
              <div className="col-md-9">
                <div className="header d-flex justify-content-center align-items-center flex-column my-4">
                  <h1 className="text-capitalize">{blogs.location}</h1>
                  <h4>{blogs.title}</h4>
                  <img
                    src={blogs.img}
                    className="img-fluid my-4"
                    alt={blogs.location}
                  />
                  <p>{blogs.blog.substring(0, 500)}</p>
                  <p>{blogs.blog.substring(501, 1000)}</p>
                  <p>{blogs.blog.substring(1001, 2500)}</p>
                  <q className="quote">{blogs.quotes} </q>
                  <p>{blogs.blog.substring(2501, 5000)}</p>
                  <p>{blogs.blog.substring(5001, 100000000)}</p>
                </div>
              </div>
              <div className="col-md-3 my-5">
                <div className="avtar mx-auto">
                  <div>
                    <img
                      src="https://images.pexels.com/photos/7610572/pexels-photo-7610572.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
                <p className="text-center my-2">AKSHAY ADME</p>
                <div className="row">
                  <div className="col col-md-5 d-flex justify-content-end">
                    <button
                      className="btn"
                      style={{ backgroundColor: "#dd4b39", color: "#fff" }}
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                  <div className="col col-md-2 d-flex justify-content-center">
                    <button
                      className="btn"
                      style={{ backgroundColor: "#00acee", color: "#fff" }}
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                  </div>
                  <div className="col col-md-5 d-flex justify-content-start">
                    <button
                      className="btn"
                      style={{ backgroundColor: "#3b5998", color: "#fff" }}
                    >
                      <i className="fab fa-facebook"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h5 className="mb-5">POST A COMMENT</h5>
                <PostComments id={blogs._id} />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <h5 className="mb-5">COMMENTS</h5>
                  <Comments comments={blogs.comments} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
            <div className="spinner-glow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Display;
