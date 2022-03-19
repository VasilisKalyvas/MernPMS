import React, { useContext, useEffect, useState } from "react";
import { Accordion, Modal } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const ProjectTasks = () => {
  const { toast } = useContext(ToastContext);

  const {id} = useParams()
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();
  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://mern-pms.herokuapp.com/api/projecttasks/`+id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setTasks(result.tasks);
        setLoading(false);
      } else {
        console.log(result);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`https://mern-pms.herokuapp.com/api/deletetask/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setTasks(result.tasks);
        toast.success("Deleted Task");
        setShowModal(false);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload(false);
};

const undoneTask = async (id) => {
  try {
    const res = await fetch(`https://mern-pms.herokuapp.com/api/undonetask/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (!result.error) {
      setTasks(result.tasks);
      toast.success("Deleted Task");
      setShowModal(false);
    } else {
      toast.error(result.error);
    }
  } catch (err) {
    console.log(err);
  }
  window.location.reload(false);
};

const doneTask = async (id) => {
  try {
    const res = await fetch(`https://mern-pms.herokuapp.com/api/donetask/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (!result.error) {
      setTasks(result.tasks);
      toast.success("Deleted Task");
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
        <h1>Tasks for Project</h1>
      <div>
     
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Tasks..." />
        ) : (
            <>
            {tasks.map((task) => (
                <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{task.name}</Accordion.Header>
                    <Accordion.Body>
                    <strong>Task Name:</strong>
                      <br></br>
                      <p>{task.name}</p>
                      <strong>User:</strong>
                      <br></br>
                      <p>{task.belongToUser.name}</p>
                      <strong>Description:</strong>
                      <p>{task.description}</p>
                      <strong>Status:</strong>: {task.status ? <>
                        <br></br>
              <span class="badge bg-success">Done</span>
                    </> : <> <span class="badge bg-danger">Undone</span> </>}
                      <br></br>
                      <hr className="my-4" />
                      <button type="button" className="btn btn-outline-secondary" onClick={() => {
                              setModalData({});
                              setModalData(task);
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
          <h3>{modalData.name}</h3>
          <p>
            <strong>Description</strong>: {modalData.description}
          </p>
          <p>
            <strong>Status</strong>: {modalData.status ? <>
              <span class="badge bg-success">Done</span>
                    </> : <> <span class="badge bg-danger">Undone</span> </>}
          </p>
        </Modal.Body>

        <Modal.Footer>
        {modalData.status ? <>
          <button type="button" class="btn btn-danger"  onClick={() => undoneTask(modalData._id)} >Undone </button>
                    </> : <> <button type="button" class="btn btn-success" onClick={() => doneTask(modalData._id)}>Done </button></>}
          <Link className="btn btn-info" to={`/edittask/${modalData._id}`}>
                Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteTask(modalData._id)}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectTasks;