import React, { useState, useEffect } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import './App.css';
import './headnav.css';





const Layout = () => {


    let navlinks;

    navlinks = (
        <>
          <li>
            <Link to="https://jeromes-portfolio-1477c9.webflow.io/" className='Kalam text-xl hover:text-black'>
              Dev
            </Link>
          </li>
          <li>
            <Link to="/LogIn" className='Kalam text-xl hover:text-black'>
              SignIn
            </Link>
          </li>
          <li>
            <Link to="/SignUp" className='Kalam text-xl hover:text-black'>
              SignUp
            </Link>
          </li>
        </>
      );


  return (
    <div style={{ boxSizing: 'border-box' }}>
    <div className="bg-custom-gradient w-full grid justify-items-center md:flex">
        <div className="sm:pl-4">
          <Link to="/Home" className="Kalam heading-3d">
            FOODIES
          </Link>
        </div>
        <div className='mb-4 text-white md:ml-auto md:mt-4 md:mr-4 md:mt-8 '>
          <ul className="flex space-x-4">
            {navlinks}
          </ul>
        </div>
      </div>
    </div>
  )
}




export default Layout
