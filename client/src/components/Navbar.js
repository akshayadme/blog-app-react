import React, { useContext } from "react";
// import { useHistory } from "react-router-dom";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from "../context/useContext";

const Navbar = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/home");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Travel Explorer
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul id="nav" className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">
                  add blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/destination">
                  destination
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  about me
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Get in touch
                </NavLink>
              </li>
              {userData.user ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    id="logout"
                    to=""
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex justify-content-center">
              <ul className="d-flex my-3 text-decoration-none list-unstyled">
                <li className="me-2">
                  <button className="btn btn-sm">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                </li>
                <li className="me-2">
                  <button className="btn btn-sm">
                    <i className="fab fa-google"></i>
                  </button>
                </li>
                <li className="me-2">
                  <button className="btn btn-sm">
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </li>
                <li className="me-2">
                  <button className="btn btn-sm">
                    <i className="fab fa-instagram"></i>
                  </button>
                </li>
                <li className="me-2">
                  <button className="btn btn-sm">
                    <i className="fab fa-twitter"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
