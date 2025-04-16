

import React,{useState,useContext} from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    

    const [mode, setMode] = useState('light');

    const toggleMode = () => {
      if (mode === 'light') {
        setMode('dark');
        document.body.style.backgroundColor = 'grey';
      } else {
        setMode('light');
        document.body.style.backgroundColor = 'white';
      }
    };

  return (
    <>
      <Navbar title="BMI" about="About BMI" mode={mode} toggleMode={toggleMode}/>
      <div 
        className={`layout-container ${mode}`} 
        style={{ 
          minHeight: "100vh", 
          backgroundColor: mode === "dark" ? "grey" : "white", 
          color: mode === "dark" ? "white" : "black",
          paddingBottom: "20px" 
        }}
      >
        <Outlet />
      </div> 
    </>
  );
};

export default Layout;