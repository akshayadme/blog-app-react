import React from "react";
import BlogCard from "./BlogCard";
import Subscribe from "./Subscribe";

const Home = () => {
  return (
    <>
      <div className="cover-container">
        <main>
          <div className="p-3 h-100 text-white d-flex flex-column justify-content-center align-items-center">
            <h1 className="">HI! i'M AKSHAY</h1>
            <p className="lead">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio voluptatibus fuga id tempora dolor, vel corrupti eaque
              culpa qui repellat?
            </p>
            <p className="lead">
              <button
                type="button"
                className="btn px-4 py-2 btn-dark text-white rounded-pill"
              >
                LEARN MORE
              </button>
            </p>
          </div>
        </main>
      </div>
      <BlogCard />
      <Subscribe />
    </>
  );
};

export default Home;
