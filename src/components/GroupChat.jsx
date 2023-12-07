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
    fetch("http://localhost:8080/api/cschat/groupchat/wow/" + decodeURIComponent(course))
      .then((res) => {return res.json()})
      .then((res) => {setChatHistory(res)})
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault(); 
  
    if (!profileName) {
      console.error('Sender name is not defined.');
      return;
    }
  
    const newMessage = {
      text: currentMessage,
      senderName: profileName, 
    };
  
    setChatHistory(prevChatHistory => {
      const updatedChatHistory = [...prevChatHistory, newMessage];
      if (updatedChatHistory.length > 15) {
        updatedChatHistory.shift(); 
      }
      return updatedChatHistory;
    });
    setCurrentMessage(""); 
  
    const encodedCourse = encodeURIComponent(course);
  
    try {
      const response = await fetch(`http://localhost:8080/api/cschat/groupchat/${encodedCourse}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileName, 
          course: encodedCourse, 
          message: newMessage.text, 
        }),
      });

      if (response.ok) {
        console.log('Message sent successfully');
      } 
      else {
        throw new Error(`Failed to send message, server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
