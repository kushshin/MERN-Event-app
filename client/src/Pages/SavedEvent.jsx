import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useGetUserID } from "../Hooks/useGetUserID";

const SavedEvent = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const userId = useGetUserID();

  useEffect(() => {
    const fetchsavedEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/event/savedEvent/${userId}`
        );
        // console.log(res.data);
        setSavedEvents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchsavedEvents();
  }, []);

  return (
    <div style={{ margin: "20px", display: "flex", flexWrap: "wrap" }}>
      {savedEvents.map((event) => {
        return (
          <Card style={{ width: "30rem", margin: "auto" }}>
            <Card.Img variant="top" src={event.image} />
            <Card.Body>
              <Card.Title>{event.eventName}</Card.Title>
              <Card.Text>{event.location}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default SavedEvent;
