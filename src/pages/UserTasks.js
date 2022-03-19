import React, { useContext, useEffect, useState } from "react";
import { Accordion, Modal } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const AllContact = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams()
  useEffect( async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://mern-backend-pms.herokuapp.com/api/usertasks/`+ id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }); 
      const result = await res.json();
      if (!result.error) {
        setUsers(result.users);
        setTasks(result.tasks);
        setLoading(false);
      } else {
        console.log(result);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const deleteUserTask = async (id) => {
    try {
      const res = await fetch(`https://mern-backend-pms.herokuapp.com/api/deleteusertask/` + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setTasks(result.myTasks);
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
    {users.map((users) => (
                <h1 key={users._id} >Tasks of User: {users.name}</h1>
              ))}
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
                      <br></br>
                      <hr className="my-2" />
                      <strong>Description:</strong>
                      <br></br>
                      <p>{task.description}</p>
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
          <Link className="btn btn-info" to={`/editusertask/${modalData._id}`}>
                Edit
          </Link>
          <button
              className="btn btn-danger"
              onClick={() => deleteUserTask(modalData._id)}
            >
              Delete
            </button>
        </Modal.Footer>
      </Modal>

      
      


    </>
  );
};

export default AllContact;