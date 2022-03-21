import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import React, { useContext, useEffect, useState } from "react";
import ToastContext from "../context/ToastContext";
import '../components/Footer.css'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <>
   <div className='jumbotron'>
      <h1>Welcome {user ? user.name : null}</h1>
      <hr className='my-4' /> 
    </div>
    <div className='footer'>
            <p>Version 1.0.0 © Vasilis Kalyvas Copyright 2022 All Rights Reserved</p>
    </div>
    </>
  );
};
export default Home
