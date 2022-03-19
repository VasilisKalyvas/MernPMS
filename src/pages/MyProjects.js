import React, { useContext, useEffect, useState } from "react";
import { Accordion, Modal } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const Projects = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://mern-backend-pms.herokuapp.com/api/myprojects`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setProjects(result.projects);
        setLoading(false);
        navigate("/myprojects", { replace: true });
      } else {
        console.log(result);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
  <>
    <div>
        <h1>Projects</h1>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Users..." />
        ) : (
          <>
          {projects.map((project) => (
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{project.name}</Accordion.Header>
                    <Accordion.Body>
                    <strong>Project Name:</strong>
                      <br></br>
                      <p>{project.name}</p>
                      <br></br>
                      <hr className="my-2" />
                      <strong>Description:</strong>
                      <br></br>
                      <p>{project.description}</p>
                      <br></br>
                      <hr className="my-2" />
                      <strong>Users:</strong> 
                      <br></br>
                      {project.users.map(users  => <><strong>{users.name}</strong><br></br></>)}
                      <hr className="my-4" />
                      <button type="button" class="btn btn-outline-secondary" onClick={() => {
                              setModalData({});
                              setModalData(project);
                              setShowModal(true);
                          }}>Options</button>
                    </Accordion.Body>
                </Accordion.Item>
                <br></br>
            </Accordion>
            
           ))}
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>Actions</h3>
          
        </Modal.Body>

        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
</>
   
  );
};

export default Projects;