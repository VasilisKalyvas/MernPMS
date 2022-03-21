import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import "./table.css";

const UsersList = () => {
  const loggedIn = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://mern-backend-pms.herokuapp.com/api/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setUsers(result.users);
        setLoading(false);
      } else {
        console.log(result);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`https://mern-backend-pms.herokuapp.com/api/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setUsers(result.users);
        toast.success("Deleted contact");
        setShowModal(false);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload(false);
};

  return (
  <>
    
    <div>
        <h1>Users List</h1>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Users..." />
        ) : (
          <>
        <div className="table">
          <table className="table table-hover">
            <thead>
              <tr className="table-dark">
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  onClick={() => {
                    setModalData({});
                    setModalData(user);
                    setShowModal(true);
                  }}
                >
                  <th scope="row">{user.name}</th>
                  <td>{user.email}</td>
                  <td>{user && user.role ? <>
                   Admin
                    </> : <> User</>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.name}</h3>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>role</strong>: {modalData.role ? <>
                   Admin
                    </> : <> User</>}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edituser/${modalData._id}`}>
              Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteUser(modalData._id)}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
</>
   
  );
};

export default UsersList;
