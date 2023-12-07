import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logoImage from "../images/logo.png";
import "../index.css";
import hashutil from "./common/hashutil.js";

function Registration(props) {
  const [changeMenuButton, setChangeMenuButton] = useState(false);
  const memberList = props.getMemberList();
  const [name, setName] = useState("");
  const [entryYear, setEntryYear] = useState("");
  const [entrySemester, setEntrySemester] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  async function createAccount() {
    const isFormValid =
      name.length > 0 &&
      entryYear.length === 4 &&
      entrySemester.length > 0 &&
      email.includes("@stonybrook.edu") &&
      password.length > 0 &&
      password === confirmPassword &&
      agree === true;

    //create account and profile
    if (!isFormValid) {
      alert("Please provide valid information");
    } else if (memberList.includes(email)) {
      alert("Already have the account");
    } else {
      const registrationData = {
        full_name: name,
        entry_year: entryYear,
        entry_semester: entrySemester,
        email: email,
        password: hashutil(name, password),
      };
      try {
        alert("Registration is sucessed!");
        const response = await fetch(
          "http://localhost:8080/api/cschat/member",
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
      } catch (error) {
        console.log("Error posting data:", error);
      }
    }
  }

  return (
    <div>
      <h1>Registration</h1>
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
      <div id="contentsRegistration">
        <Form
          id="registrationBox"
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              onChange={(e) => setName(e.target.value)}
              isInvalid={name.length == 0}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Entry Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Entry Year"
              onChange={(e) => setEntryYear(e.target.value)}
              isInvalid={entryYear.length !== 4}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a year.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Entry Semester</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="fregistration_item_semester"
              onChange={(e) => setEntrySemester(e.target.value)}
              isInvalid={entrySemester.length == 0}
            >
              <option>Select Semester</option>
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select an option.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!email.includes("@stonybrook.edu")}
            />
            <Form.Control.Feedback type="invalid">
              Only Stony Brook email is allowed.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Create Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={password.length == 0}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={confirmPassword !== password}
            />
            <Form.Control.Feedback type="invalid">
              Password do not match.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="registration_item">
            <Form.Check
              isInvalid={agree == false}
              onClick={() => setAgree(!agree)}
              label="I accept the Terms of Use & Privacy Policy."
            />
          </Form.Group>
          <Button type="submit" id="creatAccountButton" onClick={createAccount}>
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
