import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import '../index.css';
import logoImage from "../images/logo.png"; 

function Login(props) {
  const [changeMenuButton, setChangeMenuButton] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4646/api/cschat/member')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        if (typeof data === 'object') {
          setMemberList(data);
          props.setMemberList(data);
      } else {
        throw new Error('Invalid JSON format');
      }
    })
    .catch(error => {
      console.error('Error fetching course list:');
    });
  }, []);

  function checkAccount(){
    try{
      memberList.forEach(item => {
        if (item.email == email && item.password == password){
          throw new Error();
        }
      });
      alert("Login failed: invalid credentials");
      console.log('Failed - Email is', email);
      console.log('Failed - Password is', password);
    }catch(e){
      props.setEmail(email)
      alert(`Welcome to Chat Web for CS!`);
      console.log('Successed - Email is', email);
      console.log('Successed - Password is', password);
    }
  }

  return (
    <div>
      <h1>Login</h1>
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
      <div id="contentsLogin">
        <Form id="logInBox">
          <Form.Group className="mb-3" id="login_item">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" id="login_item">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button type="button" id="loginButton" onClick={checkAccount}>
            Login
          </Button>
          <div id="tryRegistration">
            <p id="tryRegistrationMessage">Not a memeber?</p>
            <Button id="registrationButton">
              <Link to="/Registration" className="nav-link">
                Registration
              </Link>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Login;
