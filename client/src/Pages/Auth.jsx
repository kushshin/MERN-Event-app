import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        margin: "100px",
        border: "2px solid black",
        padding: "50px",
        borderRadius: "10px",
      }}
    >
      <Login />
      <Register />
    </div>
  );
};

export default Auth;

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("registered successfully!please login");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Rform
        label="Register"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      // console.log(response.data);
      setCookies("accessToken", response.data.token);
      window.localStorage.setItem("userID", response.data.userId);
      window.localStorage.setItem("username", response.data.username);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Rform
        label="Login"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export const Rform = ({
  label,
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
}) => {
  return (
    <Form style={{ width: "150%" }} onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {label}
      </Button>
    </Form>
  );
};
