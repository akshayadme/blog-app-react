import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Card, CardColumns } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Destination = () => {
  let [destination, setDestination] = useState([]);
  const source = axios.CancelToken.source();

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/destination");
      const getData = response.data.destination;
      setDestination(getData);
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
      <Header heading="DESTINATION I HAVE VISITED" />
      <div className="container my-5">
        <CardColumns>
          {destination.map((value, index) => {
            return (
              <Card key={index}>
                <Card.Img variant="top" src={value.img} />
                <Card.Body>
                  <Card.Title>{value.location}</Card.Title>
                  <NavLink
                    to={`/destination/place?location=${value.location}`}
                    className="btn btn-info"
                  >
                    View Blogs of {value.location}
                  </NavLink>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </div>
    </>
  );
};

export default Destination;
