import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
import '../components/Footer.css'

const Login = () => {
  const {toast} = useContext(ToastContext);
  const {loginUser} = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
      email:"",
      password:""
  });

  const handleInputChange = (event) =>{
      const{name, value }= event.target;
      setCredentials({...credentials, [name]: value});
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      loginUser(credentials);
  };

  return (<>
    <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="emailInput" className="form-label mt-4">Email address</label>
                <input required type="email" name ='email' className="form-control" id="emailInput" onChange={handleInputChange} value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput" className="form-label mt-4">Password</label>
                <input required type="password" name ='password' onChange={handleInputChange} value={credentials.password} className="form-control" id="passwordInput" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary my-3">Login</button>
            <p>Don't have an account yet? <Link to='/register'>Create One</Link></p>
        </form>
    <div className='footer'>
        <p>Version 1.0.0 © Vasilis Kalyvas Copyright 2022 All Rights Reserved</p>
    </div>
  </>
  )
}

export default Login