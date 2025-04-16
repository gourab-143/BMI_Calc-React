// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css"; 

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       localStorage.setItem("user", JSON.stringify(data.user)); // Save user info
//       setMessage("Login successful! Redirecting...");
//       setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
//     } else {
//       setMessage(data.message || "Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="login-container mt-5">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//           <button type="submit">Login</button>
//         </form>
//         <p className="message">{message}</p>
//         <p className="switch-link">
//           Don't have an account? <a href="/signup">Sign up here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



















import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import "../styles/Login.css"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext); // ✅ Get login function from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    
    if (response.ok) {
      login(data.user); // ✅ Update AuthContext state (Navbar updates immediately)
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000); // Redirect after 1 second
    } else {
      setMessage(data.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="login-container mt-5">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p className="message">{message}</p>
        <p className="switch-link">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;




