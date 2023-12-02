import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

function Profile() {
  const [changeMenuButton, setChangeMenuButton] = useState(false);
  const [name, setName] = useState("");
  const [entryYear, setEntryYear] = useState("");
  const [entrySemester, setEntrySemester] = useState("");
  const [image, setImage] = useState("./src/images/profile_image.png");
  const [message, setMessage] = useState("Welcome");
  const [courses, setCourses] = useState([]);

  return (
    <div>
      <h1>Profile</h1>
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
            <Form.Control type="file"></Form.Control>
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
        <div id="courseBox"></div>
        <Button type="button" id="saveButton">
          Save
        </Button>
      </div>
    </div>
  );
}
export default Profile;
