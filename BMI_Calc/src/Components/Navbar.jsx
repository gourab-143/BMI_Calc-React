// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min'
// import { Link } from 'react-router-dom';

// export default function Navbar(props) {




//   return (<>
//     <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">{props.title}</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/history">History</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">{props.about}</Link>
//             </li>
//           </ul>
//         </div>
//         <div className={`form-check form-switch text-${props.mode === 'dark' ? 'light' : 'dark'}`}>
//           <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
//           <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark mode</label>
//         </div>
//       </div>
//     </nav>

//     </>
//   )
  
// }

// Navbar.propTypes = {
//   title: PropTypes.string,
//   about: PropTypes.string
// }

import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        {/* Navbar Brand */}
        <Link className="navbar-brand" to="/">BMI</Link>
        
        {/* Navbar Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar Links & Dark Mode Toggle */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/history">History</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          </ul>

          {/* Dark Mode Toggle */}
          <div className={`form-check form-switch text-${props.mode === 'dark' ? 'light' : 'dark'} me-3`}>
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
          </div>

          {/* Login & Signup Buttons */}
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link btn btn-outline-primary me-2" to="/login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link btn btn-primary" to="/signup">Signup</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
