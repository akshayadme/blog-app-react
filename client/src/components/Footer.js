import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer mt-auto py-3 text-center bg-light">
        <div className="container">
          <span className="text-muted">
            Travel Explorer | &copy; Copyright . All rights reserved{" "}
            <span id="year"></span>.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
