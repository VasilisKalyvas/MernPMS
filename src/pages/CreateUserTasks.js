import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const CreateUserTask = () => {
  const {toast} = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userTask, setUserTask] = useState({
      name:"",
      description:""
  });
  const {id} = useParams()
  const handleInputChange = (event) =>{
      const{name, value }= event.target;
      setUserTask({...userTask, [name]: value});
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
     const res = await fetch(`https://mern-pms.herokuapp.com/api/createusertasks/`+ id, 
     {  method: "POST", 
        headers:{ "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
       body: JSON.stringify({ ...userTask }),
    });
    const result = await res.json();
    if (!result.error) {
        toast.success(`Created Task ${userTask.name}`);

        setUserTask({name:"", description:""});
        navigate("/usertasks/"+id , { replace: true });
    } else {
        toast.error(result.error);
    }
  };

  return (
    <> 
      <h2>Create Task</h2>  
      <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nameInput" className="form-label mt-4">Name</label>
                <input required type="text" name ='name' className="form-control" id="emailInput" onChange={handleInputChange} value={userTask.name} aria-describedby="nameHelp" placeholder="Enter Task Name"/>
            </div>
            <div className="form-group">
                <label htmlFor="descriptionInput" className="form-label mt-4">Description</label>
                <input required type="text" name ='description' onChange={handleInputChange} value={userTask.description} className="form-control" id="descriptionInput" placeholder="Enter Task Description"/>
            </div>
            <button type="submit" className="btn btn-primary my-3">Create Task</button>
        </form>
    
    </>
  );
}

export default CreateUserTask;