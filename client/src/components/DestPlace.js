import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const DestPlace = () => {
  const source = axios.CancelToken.source();
  let [dest, setDest] = useState([]);
  let [destination, setDestination] = useState([]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let location = useQuery();

  let place = location.get("location");

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/destination/place?location=${place}`
      );

      const getData = response.data.blogs;

      setDest(getData);
      setDestination(response.data.location);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="text-center my-5">{destination}</h1>
        <div className="row">
          {dest.map((value) => {
            return (
              <>
                <Card
                  key={value._id}
                  className="offset-md-1 col-lg-10 border-0"
                >
                  <Card.Img variant="top" src={value.img} />
                  <Card.Body>
                    <Card.Text>{value.blog.substring(0, 200)}...</Card.Text>
                    <div className="d-grid gap-2">
                      <NavLink
                        to={`/blog/${value._id}`}
                        className="btn bg-light py-2 fs-4"
                      >
                        Read More <i className="fas fa-chevron-right"></i>
                      </NavLink>
                    </div>
                  </Card.Body>
                </Card>
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DestPlace;
