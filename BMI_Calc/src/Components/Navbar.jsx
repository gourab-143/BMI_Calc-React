import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar(props) {
  const { user,login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">BMI</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && ( // Only show these links if user is logged in
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/history">History</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              </>
            )}
          </ul>

          <div className={`form-check form-switch text-${props.mode === "dark" ? "light" : "dark"} me-3`}>
            <input className="form-check-input mt-2" type="checkbox" onClick={props.toggleMode} />
            <label className="form-check-label mt-2">Enable Dark Mode</label>
          </div>

          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item"><Link className="btn btn-outline-primary me-2" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="btn btn-primary" to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
