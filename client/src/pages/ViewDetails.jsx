import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { Buffer } from 'buffer';

function ViewDetails(props) {
  const [users, setUsers] = useState([]);
  const [flag , setFlag] = useState(false)

  useEffect(() => {
    if(props.id){
      getUserDetails()
    }
  }, [props.id]);

  const getUserDetails = async () => {
    try {
      const result = await axios.get(
        `https://invennicotask.onrender.com/v1/user/finduser/${props.id}` ,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(result?.data.result);
      setFlag(true)
     
    } catch (error) {
      console.warn("error:", error);
    }
  };
 
  const geturl = (users) => {
const base64String = Buffer.from(users.profilePicture.data.data).toString("base64");
    const dataURL = `data:${users.profilePicture.contentType};base64,${base64String}`;
   
    return dataURL;
  };
  
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        {!users ?  (
          <p>Loading user details...</p>
        ): (
          <Card>
           { !flag? (<p className="text-info m-auto p-3"> Image loading...</p>):( <Card.Img  className="rounded" variant="top" src={geturl(users)} /> )}

            <Card.Body> 
              <Card.Title>
                {users.firstName} {users.lastName}
              </Card.Title>
              <Card.Text>Email: {users.email}</Card.Text>
              <Card.Text>Status: {users.status}</Card.Text>
              <Card.Text>Phone Number: {users.mobile}</Card.Text>
              <Card.Text>Address: {users.address}</Card.Text>
            </Card.Body>
          </Card>
        ) }
      </Modal.Body>
      <Modal.Footer>
        <Link onClick={props.onHide}>Close</Link>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewDetails;
