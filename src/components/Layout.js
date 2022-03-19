import React from 'react'
import Navbar from './Navbar';

const Layout = ({ navbar = true, children }) => {
  return (
    <>
    {navbar && <Navbar />}
    <div className='container mt-3' style={{}}>{ children }</div>
    </>
  );
};

export default Layout;