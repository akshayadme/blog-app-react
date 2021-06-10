import React from "react";

const Subscribe = () => {
  return (
    <>
      <div className="subscribe">
        <div className="sub">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <h2 className="text-white">Newsletter</h2>
                <p className="text-white">
                  GET MY BEST STUFF SENT STRAIGHT TO YOU!
                </p>
              </div>
              <div className="col-md-3 my-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Full Name"
                />
              </div>
              <div className="col-md-3 my-auto">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email address"
                />
              </div>
              <div className="col-md-3 my-auto">
                <div className="d-grid gap-2 col-12 mx-auto">
                  <button className="btn btn-dark rounded-pill" type="button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
