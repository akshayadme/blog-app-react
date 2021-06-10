import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const source = axios.CancelToken.source();

  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  let name, value;

  const handleEvent = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      const { username, email, password } = user;
      const loginResponse = await axios.post(`http://localhost:3001/register`, {
        username,
        email,
        password,
      });

      if (loginResponse.data.message) {
        setMessage(loginResponse.data.message);
      }

      history.push("/login");
    } catch (err) {
      err.response.data.error && setMessage(err.response.data.error);
    }
  };

  useEffect(() => {
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container">
        <form method="POST">
          <div className="row">
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
            <div className="col-md-8 offset-md-2 my-5">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={user.username}
                  onChange={handleEvent}
                  required
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={user.email}
                  onChange={handleEvent}
                  required
                />
                <label htmlFor="floatingPassword">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleEvent}
                  required
                />
                <label htmlFor="floatingTextarea2">Password</label>
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

export default Signup;
