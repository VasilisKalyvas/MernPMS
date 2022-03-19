import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ToastContext from "../context/ToastContext";

const RemoveUserFromProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useContext(ToastContext);

  const [projectDetails, setProjectDetails] = useState({
    users:"",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectDetails({ ...projectDetails, [name]: value });
    console.log(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/removeusertoproject/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...projectDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`User Removed from the Project`);
      console.log(result);
      setProjectDetails({ users: ""});
      navigate("/projects");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://mern-backend-pms.herokuapp.com/api/project/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await res.json();
      setProjectDetails(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [users, setUsers] = useState([]);
  useEffect(async () => {
    try {
      const res = await fetch(`https://mern-backend-pms.herokuapp.com/api/users`, {
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
          <h2>Remove User From the Project</h2>
         <hr></hr>
          <form onSubmit={handleSubmit}>
          
            <div>
            <Form.Select name="users"  aria-label="Default select example" onChange={handleInputChange}>
            <option >Users</option>
            {users.map((user) => (
                <option value={user._id}>{user.name}</option>
                ))}
            </Form.Select>       
            </div>
            
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-info my-2"
            />
          </form>
    </>
  );
};

export default RemoveUserFromProject;