import { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NewUser = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [mobile, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const newForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setStatus("");
    setProfilePicture("");
    setPhoneNumber("");
    setAddress("");
  };

  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !status || !mobile || !address) {
      alert("Please fill in all required fields");
    }
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("status", status);
      formData.append("profilePicture", profilePicture);
      formData.append("phoneNumber", mobile);
      formData.append("address", address);
      formData.append("mobile", mobile);
      // console.log("formData", formData);
      const result = await axios.post(
        `http://localhost:8000/v1/user/adduser`,
        formData
      );
      if (result) {
        alert('User added successfully.');
        newForm()
        props.onHide();
        navigate('/');
      }      
      
    } catch (error) {
      console.error("An error occurred:", error);
    }
    
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <div className=" ">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={handleStatusChange}>
                <option value="" disabled>
                  Select
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="my-3" controlId="formProfilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setProfilePicture(e.target.files[0]);
                }}
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  minLength={10}
                  maxLength={10}
                  value={mobile}
                  onChange={handlePhoneNumberChange}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="my-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={handleAddressChange}
              />
            </Form.Group>

            <Button className="my-3" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link onClick={props.onHide}>Close</Link>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUser;
