import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import { useGetUserID } from "../Hooks/useGetUserID";
import { useCookies } from "react-cookie";
const Home = () => {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [likes, setLikes] = useState(0);
  const userId = useGetUserID();
  const [cookies, setCookies] = useCookies(["accessToken"]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3001/event");
        // console.log(res);
        setEvents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    //get ids of saved events
    const fetchsavedEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/event/savedEvents/eventId/${userId}`
        );
        // console.log(res);
        setSavedEvents(res.data.savedEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchsavedEvents();
    fetchEvents();
  }, []);

  //saved events
  const saveEvent = async (eventId) => {
    const res = await axios.put(
      "http://localhost:3001/event",
      {
        userId,
        eventId,
      },
      { headers: { authorization: cookies.accessToken } }
    );
    // console.log(res);
    setSavedEvents(res.data.savedEvents);
    try {
    } catch (error) {}
  };

  const handleLikes = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3001/event/like/" + events._id + "/like",
        { userId: userId }
      );

      console.log(res);
    } catch (error) {}
  };

  const isEventSaved = (id) => {
    return savedEvents.includes(id);
  };

  return (
    <div style={{ margin: "20px", display: "flex", flexWrap: "wrap" }}>
      {events.map((event) => {
        return (
          <Card style={{ width: "30rem", margin: "auto" }}>
            <Card.Img variant="top" src={event.image} />
            <Card.Body>
              <Card.Title>{event.eventName}</Card.Title>
              <Card.Text>{event.location}</Card.Text>
              <div style={{ display: "flex" }}>
                <Button style={{ marginRight: "10px" }} onClick={handleLikes}>
                  <BsHandThumbsUpFill />
                  {likes}
                </Button>
                <br />
                <Button onClick={handleLikes}>
                  <BsHandThumbsDownFill />
                  {likes}
                </Button>
              </div>
            </Card.Body>
            {userId === event.EventOwners ? (
              <Button
                variant="primary"
                type="button"
                onClick={() => saveEvent(event._id)}
                disabled={isEventSaved(event._id)}
              >
                {isEventSaved(event._id) ? "saved" : "save"}
              </Button>
            ) : (
              " "
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
