import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function Login() {
  const [changeMenuButton, setChangeMenuButton] = useState(false);

  return (
    <div>
      <h1>Login</h1>
      <Navbar key="md" expand="md">
        <Container fluid>
          <Navbar.Toggle
            id="menuButton"
            onClick={() => setChangeMenuButton(!changeMenuButton)}
          >
            {changeMenuButton ? "X" : "Menu"}
          </Navbar.Toggle>
          <Navbar.Offcanvas
            placement="end"
            id="navigation"
            show={changeMenuButton}
            onHide={() => setChangeMenuButton(false)}
          >
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1">
                <Link to="/Home" className="nav-link" id="menu_item">
                  Home
                </Link>
                <Link to="/Login" className="nav-link" id="menu_item">
                  Login
                </Link>
                <Link to="/Profile" className="nav-link" id="menu_item">
                  Profile
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
export default Login;
