import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = (props) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/v1/user/finduser/${props.id}`);
      setUsers(result?.data);
    } catch (error) {
      console.warn("error:", error);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, [name]: value } : user
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
console.log("click");
console.log("id", props.id)
    try {
      const result = await axios.put(`http://localhost:8000/v1/user/updateuser/${props.id}`,  {

        headers: { "Content-Type": "application/json" },



      });

      if (result.data.success) {
        // User updated successfully
        navigate("/");
      } else {
        // Handle error
        console.error("Error updating user:", result.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <div className=" ">
          {users.map((user, index) => (
            <Form className="my-4" onSubmit={handleSubmit} key={index}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={user.firstName}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={user.lastName}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={user.email}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={user.status}
                  name="status"
                  onChange={(e) => handleInputChange(index, e)}
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
                    value={user.mobile}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  value={user.address}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Form.Group>

              <Button className="my-3" variant="primary" type="submit">
                Update User
              </Button>
            </Form>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link onClick={props.onHide}>Close</Link>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUser;
