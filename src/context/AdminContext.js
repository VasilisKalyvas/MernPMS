import { createContext, useContext, useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./AuthContext";


const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    checkAdmin();
  }, []);
  
  const checkAdmin = async () => {
    try {
      const res = await fetch(`https://mern-pms.herokuapp.com/api/admin`, {
        method: "GET"
      });
      const result = await res.json();
      if (!result.error) {
        if (
          location.pathname === "/admin"
        ) {
          setTimeout(() => {
            navigate("/admin", { replace: true });
          }, 500);
        }else {
          navigate(location.pathname ? location.pathname : "/");
        }
        setUser(result);
      }else{
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
    //
  };

  return (
    <AdminContext.Provider value={{ checkAdmin, user, setUser }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;