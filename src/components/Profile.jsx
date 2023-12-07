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
import axios from 'axios';
const defaultImage = "./src/images/Default.png"; 

function Profile(props) {
  const [changeMenuButton, setChangeMenuButton] = useState(false);
  const [name, setName] = useState("");
  const [entryYear, setEntryYear] = useState("");
  const [entrySemester, setEntrySemester] = useState("");
  const [image, setImage] = useState("./src/images/profile_image.png");
  const [message, setMessage] = useState("Hello");
  const [courses, setCourses] = useState([]);
  const [validCourses, setValidCourses] = useState([]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'pezr9rpl'); 
  
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dbf7osnq6/image/upload', formData); 
        const imageUrl = response.data.secure_url;
        props.setProfileImage(imageUrl);
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }
    else {
      console.log("Invalid file type");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4646/api/cschat/groupchat/${courses}');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setValidCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses: ", error.message);
      }
    };
    fetchCourses();
  }, []);

  const handleCoursesChange = (e) => {
    const coursesArray = e.target.value.split(',').map(course => course.trim());
    console.log(coursesArray)
    console.log(validCourses)
    const filteredCourses = coursesArray.filter(course => validCourses.includes(course));
    setCourses(filteredCourses);
  };

  const navigate = useNavigate();
  const handleCourseClick = (course) => {
    navigate(`/group-chat/${encodeURIComponent(course)}`, { state: { profileName: name } });
  };

  const handleMessageChange = (e) => {
    props.setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const email = props.getEmail(); 
        console.log("Fetching profile for email:", email);
  
        const response = await fetch(`http://localhost:4646/api/cschat/member/${email}`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Profile data received:", data);
        setName(data.full_name);
        setEntryYear(data.entry_year);
        setEntrySemester(data.entry_semester);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };
  
    fetchProfileData();
  }, [props]);
  
  const saveProfile = async () => {
    try {
      const response = await fetch('http://localhost:4646/api/cschat/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: props.getEmail(),
          message: props.message,
          courses: courses,
        }),
      });

  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data)
      console.log("Profile saved successfully:", data)
    } 
    
    catch (error) {
      console.error("Failed to save profile:", error.message);
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
            Entry: {entryYear} , {entrySemester}
          </div>
          <Form.Group className="mb-3" id="profile_item_image">
            <Form.Control type="file" onChange={handleImageChange}></Form.Control>
            <Image src={props.profileImage || defaultImage} roundedCircle width="100" height="100" />
          </Form.Group>
          <Form.Group className="mb-3" id="profile_item_message">
            <Form.Label>Message</Form.Label>
            <Form.Control type="text" value={props.message} onChange={handleMessageChange} placeholder="Enter a message"/> 
            </Form.Group>
          <Form.Group className="mb-3" id="profile_item_courses">
            <Form.Label>Courses</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handleCoursesChange} placeholder="Enter courses, separated by commas"/>
          </Form.Group>
          <div>
            <h3>My Courses</h3>
              {courses.map((course, index) => (
                validCourses.includes(course) && <Button key={index} onClick={() => handleCourseClick(course)}>
                  {course}
                </Button>
              ))}
          </div>
        </Form>
        <div id="courseBox"></div>
        <Button type="button" id="saveButton" onClick={saveProfile}>
          Save
        </Button>
      </div>
    </div>
  );
}
export default Profile;