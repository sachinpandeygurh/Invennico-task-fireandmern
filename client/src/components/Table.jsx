
// import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import EditUser from "../pages/EditUser";
import axios from "axios";
import { useEffect, useState } from "react";
import ViewDetails from "../pages/ViewDetails";
import { trusted } from "mongoose";

const TableComponent = () => {
  const randomStatus = () => {
    return Math.random() < 0.5 ? "Active" : "Inactive";
  };

  const [modalShow, setModalShow] = useState(false);
  const [modalsh, setModalsh] = useState(false);
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const result = await axios.get("https://invennicotask.onrender.com/v1/user/getuser");
    console.log("result", result);
    console.log("users", users);
      setUsers(result?.data);
    } catch (error) {
      console.warn("error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://invennicotask.onrender.com/v1/user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (res.status === 200) {
        setFlag(!flag);
        alert("Document deleted successfully");

      } else {
        console.error("Error deleting document");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleClick = (userId) => {
    setModalShow(true)
    console.log("userId" , userId);
  };
  console.log(users);

  return (
    <Table striped bordered hover variant="light" responsive>
      <thead>
        <tr align="center">
          <th>Sn No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {!users ? <tr className="text-dark m-auto">Loading...</tr> : (
  users.map((user, index) => (
    <tr key={index} align="center">
      <td>{index + 1}</td>
      <td>{`${user.firstName} ${user.lastName}`}</td>
      <td>{user.email}</td>
      <td className={user.status === 'Active' ? 'text-success' : 'text-danger'}>
        {user.status}
      </td>
      <td>
        <div className="d-flex justify-content-evenly">
          <Button variant="primary" className="btn-sm m-1" onClick={() => handleClick(user._id)}>
            Edit
          </Button>
          <Button variant="danger" className="btn-sm m-1 btn" onClick={() => handleDelete(user._id)}>
            Delete
          </Button>
          <Button variant="success" className="btn-sm m-1" onClick={() => setModalsh(true)}>
            View Details
          </Button>
        </div>
      </td>
    </tr>
  ))
)}

        
        
      </tbody>
    </Table>
  );
};

export default TableComponent;
