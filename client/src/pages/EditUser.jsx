import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = (props) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(props.id)getUserDetails();
  }, [props.id]);

  const getUserDetails = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/v1/user/finduser/${props.id}`
      );
      setUsers(result?.data?.result);
     
    } catch (error) {
      console.warn("error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUsers((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.put(
        `http://localhost:8000/v1/user/updateuser/${props.id}`,
       {
        firstName : users.firstName,
        lastName : users.lastName,
        email : users.email,
        mobile : users.mobile,
        status: users.status
       },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (result.data && result.data.message === "User updated successfully") {
        
        alert(result.data.message);
        navigate("/");

      } else {
        console.error("Error updating user:", result.data.message);
        alert("Error updating user: " + result.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

  };

  const handleClose = () => {
    props.onHide();
  };

  
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <div className=" ">
        {!users.email? (<p className="text-center text-info "> Loading please wait ...</p>) :(
          <Form className="my-4" onSubmit={handleSubmit}>
            <h6 className="m-auto y-3 text-center text-info">User Details.</h6>
           

            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                value={users.firstName}
                 onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="lastName"
                value={users.lastName}
                 onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={users.email}
                 onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={users.status}
                name="status"
                 onChange={(e) => handleInputChange(e)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formProfilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" accept="image/*" />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="mobile"
                  value={users.mobile}
                   onChange={(e) => handleInputChange(e)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={users.address}
                 onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Button className="my-3" variant="primary" type="submit">
              Update User
            </Button>
          </Form>)}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link onClick={handleClose}>Close</Link>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUser;
