import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const NavTab = () => {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const name = window.localStorage.getItem("username");

  const Logout = () => {
    setCookies("accessToken", "");
    window.localStorage.clear("");
    // window.localStorage.removeItem("userID");
    // window.localStorage.removeItem("username");
    navigate("/auth");
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav
            className="me-auto"
            style={{
              margin: "auto",
              alignItems: "center",
            }}
          >
            {name ? (
              <Nav.Link href="#">
                <h4>Welcome : {name}</h4>
              </Nav.Link>
            ) : (
              ""
            )}

            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/createEvent">CreateEvent</Nav.Link>
            <Nav.Link href="/savedEvent">SavedEvent</Nav.Link>

            {!cookies.accessToken ? (
              <Nav.Link href="/auth">Register/Login</Nav.Link>
            ) : (
              <Nav.Link href="/logout" onClick={Logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavTab;
