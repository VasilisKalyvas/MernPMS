import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <>
      <div className="jumbotron">
        <h1>Profile: {user ? user.name : null}</h1>
        <hr className="my-4" />
        <h3>Email: {user ? user.email : null}</h3>
        <h3>Role: {user && user.role ? <>
                   Admin
                    </> : <> User</>}</h3>
      </div>
    </>
  );
};

export default Profile;