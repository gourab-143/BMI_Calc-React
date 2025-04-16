import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from './Components/Home'; 
import Navbar from './Components/Navbar';
import About from './Components/About';
import History from './Components/History';
import Layout from './Components/Layout';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { AuthProvider } from './context/AuthContext.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/history", element: <History /> },
      { path: "/login", element: <Login /> },  
      { path: "/signup", element: <Signup /> }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <RouterProvider router={router}>
  //     <AuthProvider>
  //       <App/>
  //     </AuthProvider>
  //   </RouterProvider>
  // </React.StrictMode>

  <React.StrictMode>
  <AuthProvider> {/* Wrap everything inside AuthProvider */}
    <RouterProvider router={router} />
  </AuthProvider>
</React.StrictMode>
);

