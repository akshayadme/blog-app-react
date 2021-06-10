import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/useContext";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const source = axios.CancelToken.source();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { setUserData } = useContext(UserContext);

  const postData = async (e) => {
    try {
      e.preventDefault();
      const loginUser = { email, password };
      const loginResponse = await axios.post(
        `http://localhost:3001/login`,
        loginUser
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data,
      });

      localStorage.setItem("auth-token", loginResponse.data.token);

      if (loginResponse.data.message) {
      }
      history.push("/home");
      setMessage("");
    } catch (err) {
      err.response.data.msg && setMessage(err.response.data.msg);
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
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Email Address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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

export default Login;
