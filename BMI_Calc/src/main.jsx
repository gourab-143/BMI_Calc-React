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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/history", element: <History /> }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 
      <RouterProvider router={router}/>
    
  </React.StrictMode>
);
