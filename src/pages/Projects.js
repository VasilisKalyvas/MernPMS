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
  const navigate = useNavigate();

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://mern-pms.herokuapp.com/api/projects`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setProjects(result.projects);
        setLoading(false);
        navigate("/projects", { replace: true });
      } else {
        console.log(result);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  const deleteProject = async (id) => {
    try {
      const res = await fetch(`https://mern-pms.herokuapp.com/api/deleteproject/` + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setProjects(result.projects);
        toast.success("Deleted Project");
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
        <h1>Projects List</h1>
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
                     
                      <Link to={`/addtasktoproject/${project._id}`}>
                        <button type="button" class="btn btn-outline-secondary" style={{marginLeft: "10px"}}>Add Task</button>
                      </Link>
                      <Link to={`/projecttasks/${project._id}`}>
                        <button type="button" class="btn btn-outline-secondary" style={{marginLeft: "10px"}}>View Tasks</button>
                      </Link>
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
          <hr className="my-4" />
          <Link className="btn btn-info" to={`/addusertoproject/${modalData._id}`}>
              Add User
          </Link>
          <br></br>
          <br></br>
          <Link className="btn btn-danger" to={`/removeusertoproject/${modalData._id}`}>
              Remove User
          </Link>
        </Modal.Body>

        <Modal.Footer>
          
          <Link className="btn btn-info" to={`/editproject/${modalData._id}`}>
              Edit Project
          </Link>
          <button
              className="btn btn-danger"
              onClick={() => deleteProject(modalData._id)}
            >
              Delete ProJect
            </button>
        </Modal.Footer>
      </Modal>
</>
   
  );
};

export default Projects;
