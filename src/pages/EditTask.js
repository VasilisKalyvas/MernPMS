import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useContext(ToastContext);
  
    const [taskDetails, setTaskDetails] = useState({
      name: "",
      description:"",
    });
    const [loading, setLoading] = useState(false);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setTaskDetails({ ...taskDetails, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const res = await fetch(`https://mern-backend-pms.herokuapp.com/api/edittask`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, ...taskDetails }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success(`Updated ${taskDetails.name}`);
  
        setTaskDetails({ name: "",  description:""});
        navigate("/projects");
      } else {
        toast.error(result.error);
      }
    };
  
    useEffect(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://mern-backend-pms.herokuapp.com/api/task/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        setTaskDetails({
          name: result.name,
          description: result.description
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }, []);

    return (
      <>
        {loading ? (
          <Spinner splash="Loading ..." />
        ) : (
          <>
            <h2>Edit Task : {taskDetails.name}</h2>
  
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nameInput" className="form-label mt-4">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  name="name"
                  value={taskDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailInput" className="form-label mt-4">
                  Description:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emailInput"
                  name="description"
                  value={taskDetails.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="submit"
                value="Save Changes"
                className="btn btn-info my-2"
              />
            </form>
          </>
        )}
      </>
    );
  };

export default EditTask;