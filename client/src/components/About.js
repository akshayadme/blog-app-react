import React from "react";
import Header from "./Header";
import Subscribe from "./Subscribe";

const About = () => {
  return (
    <>
      <Header heading="ABOUT ME" />
      <div className="container about">
        <div className="row">
          <div className="col-md-6 my-5">
            <h1>HI! i'M AKSHAY</h1>
            <h1>LETS TRAVEL WITH ME</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              ipsum dolorum suscipit dicta excepturi, laborum, at amet magnam
              repudiandae veniam quibusdam corrupti ipsam voluptatibus harum nam
              ad sint odio tempore.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              laborum rerum enim ad quis possimus ratione a ut fugit labore.
            </p>
            <div className="social">
              <div className="row">
                <div className="col-md-5 d-flex justify-content-end">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#dd4b39", color: "#fff" }}
                  >
                    <i className="fab fa-instagram"></i>
                  </button>
                </div>
                <div className="col-md-2 d-flex justify-content-center">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#00acee", color: "#fff" }}
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                </div>
                <div className="col-md-5 d-flex justify-content-start">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#3b5998", color: "#fff" }}
                  >
                    <i className="fab fa-facebook"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 my-5 d-flex justify-content-center align-items-center">
            <div className="border-dotted p-4">
              <img
                src="https://images.pexels.com/photos/3687139/pexels-photo-3687139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Subscribe />
    </>
  );
};

export default About;
