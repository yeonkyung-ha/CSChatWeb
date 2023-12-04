import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import logoImage from "../images/logo.png"; 
import '../index.css';

function Profile(props) {
  const [changeMenuButton, setChangeMenuButton] = useState(false);
  const email = props.getEmail(); //email is the key to find the profile information in databases
  const [name, setName] = useState("");
  const [entryYear, setEntryYear] = useState("");
  const [entrySemester, setEntrySemester] = useState("");
  const [image, setImage] = useState("./src/images/profile_image.png");
  const [message, setMessage] = useState("Hello");
  const [courses, setCourses] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    
    if (file && file.type.match('image.*')) { 
      const reader = new FileReader();
      
      reader.onload = (readEvent) => { 
        setImage(readEvent.target.result); 
      };
      
      reader.readAsDataURL(file); 
    } 
    else {
      setImage(null); 
    }
  };

  return (
    <div>
      <h1>Profile</h1>
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
      <div id="contentsProfile">
        <Form id="profileBox">
          <div>Name: {name}</div>
          <div>
            Entry: {entryYear}
            {entrySemester}
          </div>
          <Form.Group className="mb-3" id="profile_item_image">
            <Form.Control type="file" onChange={handleImageChange}></Form.Control>
            <Image src={image} roundedCircle width="100" height="100"></Image>
          </Form.Group>
          <Form.Group className="mb-3" id="profile_item_message">
            <Form.Label>Message</Form.Label>
            <Form.Control type="text" placeholder={message}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" id="profile_item_courses">
            <Form.Label>Courses</Form.Label>
            <Form.Control type="text" placeholder={courses}></Form.Control>
          </Form.Group>
        </Form>
        {/* chatting room button in id (courseBox) */}
        <div id="courseBox"></div>
        <Button type="button" id="saveButton">
          Save
        </Button>
      </div>
    </div>
  );
}
export default Profile;
