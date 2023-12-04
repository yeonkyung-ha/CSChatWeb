import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logoImage from "../images/logo.png"; 
import '../index.css';

function GroupChat() {
  const [changeMenuButton, setChangeMenuButton] = useState(false);

  return (
    <div>
      <h1>Group Chat</h1>
      <img src={logoImage} alt="Logo" id="logo" /> 
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
      <div id="contentsGroupChat">
        {/* Chatting Space */}
        <div id="chatHistory"></div>
        <Form id="ChatBox">
          <Form.Group className="mb-3" id="groupChat_item_message">
            <Form.Control type="text" placeholder="Type message"></Form.Control>
          </Form.Group>
          <Button type="submit" id="sendButton">
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default GroupChat;
