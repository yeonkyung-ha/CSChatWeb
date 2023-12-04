import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import logoImage from "../images/logo.png"; 
import '../index.css';
const defaultImage = "./src/images/Default.png"; 

function Profile(props) {
  const [changeMenuButton, setChangeMenuButton] = useState(false);
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
        props.setProfileImage(readEvent.target.result); 
      };
      
      reader.readAsDataURL(file); 
    } 
    else {
      props.setProfileImage(null); 
    }
  };

  const handleCoursesChange = (e) => {
    const coursesArray = e.target.value.split(',').map(course => course.trim());
    setCourses(coursesArray);
  };

  const navigate = useNavigate();
  const handleCourseClick = (course) => {
    navigate(`/group-chat/${encodeURIComponent(course)}`, { state: { profileName: name } });
  };

  const handleMessageChange = (e) => {
    props.setMessage(e.target.value);
  };

  useEffect(() => {
    const email = props.getEmail(); 

    fetch(`http://localhost:8080/api/cschat/member/${email}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setName(data.full_name);
        setEntryYear(data.entry_year);
        setEntrySemester(data.entry_semester);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, [props]);

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
            Entry: {entryYear} , {entrySemester}
          </div>
          <Form.Group className="mb-3" id="profile_item_image">
            <Form.Control type="file" onChange={handleImageChange}></Form.Control>
            <Image src={props.profileImage || defaultImage} roundedCircle width="100" height="100" />
          </Form.Group>
          <Form.Group className="mb-3" id="profile_item_message">
            <Form.Label>Message</Form.Label>
            <Form.Control type="text" value={props.message} onChange={handleMessageChange} placeholder="Enter a message" /> 
            </Form.Group>
          <Form.Group className="mb-3" id="profile_item_courses">
            <Form.Label>Courses</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handleCoursesChange} placeholder="Enter courses, separated by commas"/>
          </Form.Group>
          <div>
            <h3>My Courses</h3>
              {courses.map((course, index) => (
                <Button key={index} onClick={() => handleCourseClick(course)}>
                  {course}
                </Button>
              ))}
          </div>
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
