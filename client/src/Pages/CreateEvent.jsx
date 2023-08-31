import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../Hooks/useGetUserID";
import { useCookies } from "react-cookie";

const CreateEvent = () => {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [events, setEvents] = useState({
    eventName: "",
    location: "",
    image: "",
    desc: "",
    likes: 0,
    EventOwners: userID,
  });

  const handleEvent = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:3001/event", events, {
        headers: { authorization: cookies.accessToken },
      });
      alert("event create");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const EventChange = (e) => {
    const { value, name } = e.target;
    setEvents({ ...events, [name]: value });
  };

  return (
    <div style={{ width: "30%", margin: "auto" }}>
      <Form onSubmit={handleEvent}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="eventName"
            value={events.eventName}
            onChange={EventChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            name="location"
            value={events.location}
            onChange={EventChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add image Url"
            name="image"
            value={events.image}
            onChange={EventChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Desc</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            name="desc"
            value={events.desc}
            onChange={EventChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit">
          CreateEvent
        </Button>
      </Form>
    </div>
  );
};

export default CreateEvent;
