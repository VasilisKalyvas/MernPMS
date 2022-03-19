import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const AddUserToProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useContext(ToastContext);

  const [taskDetails, setTaskDetails] = useState({
    name:"",
    description:"",
    belongToUser:"",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`https://mern-pms.herokuapp.com/api/createtaskforproject/`+ id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...taskDetails }),
    });
    const result = await res.json();
    console.log(result);
    if (!result.error) {
      toast.success(`Task created`);

      setTaskDetails({ name:"", description:"", belongToUser:""});
      navigate("/projects");
    } else {
      toast.error(result.error);
    }
  };
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    try {
      const res = await fetch(`https://mern-pms.herokuapp.com/api/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await res.json();
      if (!result.error) {
        setUsers(result.users);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
          <h2>Add Task</h2>
         <hr></hr>
          <form onSubmit={handleSubmit}>
          
            <div>
            <Form.Select name="belongToUser"  aria-label="Default select example" value={taskDetails.belongToUser} onChange={handleInputChange}>
            <option >Choose User:</option>
            {users.map((user) => (
                <option value={user._id}>{user.name}</option>
                ))}
            </Form.Select>
 
            <div className="form-group">
                <label htmlFor="nameInput" className="form-label mt-4">Enter Task Name</label>
                <input required type="text" name ='name' className="form-control" id="emailInput" onChange={handleInputChange} value={taskDetails.name} aria-describedby="nameHelp" placeholder="Enter Project Name"/>
            </div>
            <div className="form-group">
                <label htmlFor="emailInput" className="form-label mt-4">Enter Task Description</label>
                <input required type="text" name ='description' onChange={handleInputChange} value={taskDetails.description} className="form-control" id="emailInput" placeholder="Enter Project Description"/>       
            </div>
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-info my-2"
            />
            </div>
          </form>
    </>
  );
};

export default AddUserToProject;