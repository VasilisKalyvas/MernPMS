import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import ToastContext from '../context/ToastContext';
import { FaHome, FaUserLock, FaTasks, FaPhoneAlt, FaPowerOff, FaUserCircle, FaUserPlus, FaFolder} from "react-icons/fa";
const Navbar = ({title = "PMS"}) => {
  const {user, setUser} = useContext(AuthContext);
  const {toast} = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">{title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav ms-auto">
                  {user ? <>
                    {  location.pathname === "/" ? <>
                    <Link to="/">
                        <a className="btn btn-secondary"><FaHome size={30}></FaHome></a>
                    </Link>
                    </>:<>
                    <Link to="/">
                        <a className="btn btn-primary"><FaHome size={30}></FaHome></a>
                    </Link>
                    </>}

                    {  location.pathname === "/profile" ? <>
                    <Link to="/profile">
                      <a className="btn btn-secondary"><FaUserCircle size={30}></FaUserCircle></a>
                    </Link>
                    </>:<>
                    <Link to="/profile">
                      <a className="btn btn-primary"><FaUserCircle size={30}></FaUserCircle></a>
                    </Link>
                    </>}
                            {/*{user ? user.name : null} */} 
                          
                           { user && user.role ? <>
                            {  location.pathname === "/admin" ? <>
                           <Link to="/admin">
                             <a className="btn btn-secondary"><FaUserLock  size={30}></FaUserLock></a>
                             </Link>
                           </> : <>
                           <Link to="/admin">
                             <a className="btn btn-primary"><FaUserLock  size={30}></FaUserLock></a>
                             </Link>
                           </> }
                           </> : <></> }

                           {  location.pathname === "/mytask" ? <>
                           <Link to="/mytask">
                             <a className="btn btn-secondary"><FaTasks size={30}></FaTasks></a>
                           </Link>
                           </>:<>
                           <Link to="/mytask">
                             <a className="btn btn-primary"><FaTasks size={30}></FaTasks></a>
                           </Link>
                           </>}

                           {  location.pathname === "/myprojects" ? <>
                           <Link to="/myprojects">
                             <a className="btn btn-secondary"><FaFolder size={30}></FaFolder></a>
                           </Link>
                           </>:<>
                           <Link to="/myprojects">
                             <a className="btn btn-primary"><FaFolder size={30}></FaFolder></a>
                           </Link>
                           </>}
                  <li className="nav-item">
                    <button className="btn btn-primary" onClick= {()=> { setUser(null); localStorage.clear(); console.log("Logout"); toast.success("Logout"); navigate("/login", {replace: true}); }}><FaPowerOff size={30}></FaPowerOff></button>
                    </li>
                    </> 
                    : 
                    <>
                    <li className="nav-item">
                    <Link to="/login">
                      <a className="nav-link">Login </a>
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/register">
                      <a className="nav-link">Register </a>
                    </Link>
                    </li> </>}
                    
                    
                </ul>
                </div>
            </div>
        </nav>


  )
}

export default Navbar