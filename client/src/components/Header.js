import React from "react";

const Header = ({ heading }) => {
  return (
    <>
      <div className="top-section">
        <h1>{heading}</h1>
      </div>
    </>
  );
};

export default Header;
