import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import EditUser from "../pages/EditUser";
import ViewDetails from "../pages/ViewDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TableComponent = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalsh, setModalsh] = useState(false);
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(false);
  const [userId, setUserId] = useState(null);
  const [EduserId, setEdUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const result = await axios.get("https://invennicotask.onrender.com/v1/user/getuser", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFlag(true);
      setUsers(result?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleDelete = async (id) => {
   
    try {
      // console.log("body" , body);
      const res = await axios.delete(`https://invennicotask.onrender.com/v1/user/delete/${id}`, { 
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 200) {
        alert("Document deleted successfully");
        navigate("/");
      } else {
        console.error("Error deleting document");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleEdit = (EduserId) => {
    setModalShow(true);
    setEdUserId(EduserId);
  };

  const handledetails = (userIdd) => {
    setModalsh(true);
    setUserId(userIdd);
  };

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
        {!flag ? (
          <tr align="center">
            <td colSpan="5" className="text-dark">
              Loading please wait...
            </td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr key={index} align="center">
              <td>{index + 1}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td
                className={
                  user.status === "Active" ? "text-success" : "text-danger"
                }
              >
                {user.status}
              </td>
              <td>
                <div className="d-flex justify-content-evenly">
                  <Button
                    variant="primary"
                    className="btn-sm m-1"
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm m-1 btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="success"
                    className="btn-sm m-1"
                    onClick={() => handledetails(user._id)}
                  >
                    View Details
                  </Button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
      <EditUser
        id={EduserId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <ViewDetails
        id={userId}
        show={modalsh}
        onHide={() => setModalsh(false)}
      />
    </Table>
  );
};

export default TableComponent;
