import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logoImage from "../images/logo.png"; 
import '../index.css';

function GroupChat(props) {
  const [changeMenuButton, setChangeMenuButton] = useState(false);
  const { course } = useParams();
  const decodedCourse = decodeURIComponent(course);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const location = useLocation();
  const profileName = location.state?.profileName;
  
  useEffect(() => {
    console.log(`Profile Name: ${profileName}`); 
  }, [profileName]);

  
  const handleSendMessage = (event) => {
    event.preventDefault(); 

    if (!profileName) {
      console.error('Sender name is not defined.');
      return;
    }

    const newMessage = {
      text: currentMessage,
      senderName: profileName, 
    };

    setChatHistory([...chatHistory, newMessage]);
    setCurrentMessage("");
  };

  return (
    <div>
      <h1> Group Chat for {decodedCourse} </h1>
      <img src={logoImage} alt="Logo" id="logo"/>
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
        <div id="chatHistory">
          {chatHistory.map((message, index) => (
            <div key={index}>
              {message.text} - <strong>{message.senderName}</strong>
            </div>
          ))}
        </div>
        <Form id="ChatBox" onSubmit={handleSendMessage}>
          <Form.Group className="mb-3" id="groupChat_item_message">
          <Form.Control type="text" placeholder="Type message" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} /> </Form.Group>
          <Button type="submit" id="sendButton">
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default GroupChat;
