import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import { FaFolder, FaFolderPlus, FaUsers} from "react-icons/fa";

const Admin = () => {
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
      const res = await fetch(`https://mern-pms.herokuapp.com/api/users`, {
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
      const res = await fetch(`https://mern-pms.herokuapp.com/api/deleteuser/${id}`, {
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
  <h1>Admin Panel</h1>
  <hr className='my-4'/>
  <br></br>
  <div className="container" style={{paddingLeft: '6.5rem'}} >
    <div class="container mx-auto mt-4">
      <div class="row">
         <div class="col-md-4">
           <Card border="light" style={{width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
              <strong style={{color: 'black'}}>Users List</strong>
              <Card.Body>
                <Link to="/userslist">
                  <a className="btn btn-secondary"><FaUsers size={140}></FaUsers></a>
                </Link>
              </Card.Body>
           </Card>
         </div>
         <div class="col-md-4">
           <Card border="light" style={{width: '12rem' , display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
              <strong style={{color: 'black'}}>Create Project</strong>
              <Card.Body>
                <Link to="/project">
                  <a className="btn btn-secondary"><FaFolderPlus size={140}></FaFolderPlus></a>
                </Link>
              </Card.Body>
           </Card>
         </div>
         <div class="col-md-4">
           <Card border="light" style={{width: '12rem'  , display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
              <strong style={{color: 'black'}}>Projects</strong>
              <Card.Body>
                <Link to="/projects">
                  <a className="btn btn-secondary"><FaFolder size={140}></FaFolder></a>
                </Link>
              </Card.Body>
           </Card>
         </div>
       </div>
    </div>
  </div>
</>
   
  );
};

export default Admin;
