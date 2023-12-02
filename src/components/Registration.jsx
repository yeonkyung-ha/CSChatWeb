import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Registration(props) {
  const [changeMenuButton, setChangeMenuButton] = useState(false);
  const memberList = props.getMemberList();
  const [name, setName] = useState("");
  const [entryYear, setEntryYear] = useState("");
  const [entrySemester, setEntrySemester] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createAccount() {
    //create account and profile
    if (memberList.includes(email)) {
      console.log(memberList);
      alert("Already have the account");
    } 
    else {
      const registrationData = {
        full_name: name,
        entry_year: entryYear,
        entry_semester: entrySemester,
        email: email,
        password: password,
      };
      try {
        const response = await fetch(
          "http://localhost:4646/api/cschat/member",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result.message);
        alert("Success!")
      } catch (error) {
        console.log("Error posting data:", error);
      }
    }
  }

  return (
    <div>
      <h1>Registration</h1>
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
      <div id="contentsRegistration">
        <Form id="registrationBox">
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Entry Information</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Entry Year"
              maxLength="4"
              onChange={(e) => setEntryYear(e.target.value)}
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            id="fregistration_item_semester"
            onChange={(e) => setEntrySemester(e.target.value)}
          >
            <option>Select Semester</option>
            <option value="Spring">Spring</option>
            <option value="Fall">Fall</option>
          </Form.Select>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Create Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password"/>
          </Form.Group>
          <Button type="button" id="creatAccountButton" onClick={createAccount}>
            Create Account
          </Button>
          <div id="tryLogin">
            <p id="tryLoginMessage">Have an account?</p>
            <Button id="tryLoginButton">
              <Link to="/Login" className="nav-link">
                Login
              </Link>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Registration;