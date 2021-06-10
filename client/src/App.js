import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Display from "./components/Display";
import About from "./components/About";
import Contact from "./components/Contact";
import Destination from "./components/Destination";
import DestPlace from "./components/DestPlace";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserContext from "./context/useContext";

function App() {
  const [userData, setUserData] = useState({
    token: "",
    user: "",
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        "http://localhost:3001/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:3001/getUser", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userRes.data.user,
        });
      }
    };
    checkLoggedIn();
  }, []);
  // console.log(userData.user._id);
  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <Switch>
            <Route exact path={["/home", "/"]} component={Home} />
            <Route path="/blog/:id" component={Display} />
            <Route exact path="/edit/:id" component={EditBlog} />
            <Route path="/blog" component={AddBlog} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/destination" component={Destination} />
            <Route exact path="/destination/place" component={DestPlace} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
