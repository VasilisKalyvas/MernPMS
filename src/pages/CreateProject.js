import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const CreateProject = () => {
  const {toast} = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState({
      name:"",
      description:"",
  });

  const handleInputChange = (event) =>{
      const{name, value }= event.target;
      setProjectDetails({...projectDetails, [name]: value});
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
     const res = await fetch(`https://mern-pms.herokuapp.com/api/project`, 
     {  method: "POST", 
        headers:{ "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
       body: JSON.stringify({ ...projectDetails }),
    });
    const result = await res.json();
    if (!result.error) {
        toast.success(`Created Project ${projectDetails.name}`);

        setProjectDetails({name:"", description:""});
        navigate('/projects');
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
        },
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
      <h2>Create Project</h2>  
      <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nameInput" className="form-label mt-4">Enter Project Name</label>
                <input required type="text" name ='name' className="form-control" id="emailInput" onChange={handleInputChange} value={projectDetails.name} aria-describedby="nameHelp" placeholder="Enter Project Name"/>
            </div>
            <div className="form-group">
                <label htmlFor="emailInput" className="form-label mt-4">Enter Project Description</label>
                <input required type="text" name ='description' onChange={handleInputChange} value={projectDetails.description} className="form-control" id="emailInput" placeholder="Enter Project Description"/>
            </div>
            <br></br>
            <button type="submit" className="btn btn-primary my-3">Create Project</button>
        </form>
    
    </>
  );
}

export default CreateProject