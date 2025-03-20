// import React from 'react';
// //import './About.css';
// import '../styles/About.css'

// const About = () => {
//   return (
//   <div className="container">
//     <div className="container mt-5">
    
//       <div className="text-center mb-4">
//         <h1 className="fw-bold">About BMI</h1>
//         <p className="text">Understand your Body Mass Index (BMI) and its importance for health.</p>
//       </div>

      
//       <div className="container card shadow p-4 mb-4">
//         <h3>📌 What is BMI?</h3>
//         <p>
//           Body Mass Index (BMI) is a numerical value calculated from your weight and height. It is used to determine if you are underweight, normal weight, overweight, or obese.
//         </p>
//       </div>

      
//       <div className="container card shadow p-4 mb-4">
//         <h3>📊 How is BMI Calculated?</h3>
//         <p>The BMI formula is:</p>
//         <div className=" text-center fw-bold  p-3 rounded">
//           <p className='container'>BMI = <span className="text-primary">Weight (kg)</span> ÷ <span className="text-success">Height (m)²</span></p>
//           <p>or</p>
//           <p className='container '>BMI = <span className="text-primary">Weight (lb) × 703</span> ÷ <span className="text-success">Height (in)²</span></p>
//         </div>
//       </div>

      
//       <div className="container card shadow p-4 mb-4">
//         <h3>📋 BMI Categories</h3>
//         <table className="table table-striped text-center">
//           <thead className="table-dark">
//             <tr>
//               <th>Category</th>
//               <th>BMI Range</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td>Underweight</td><td>BMI &lt; 18.5</td></tr>
//             <tr><td>Normal Weight</td><td>18.5 - 24.9</td></tr>
//             <tr><td>Overweight</td><td>25 - 29.9</td></tr>
//             <tr><td>Obese</td><td>BMI ≥ 30</td></tr>
//           </tbody>
//         </table>
//       </div>

      
//       <div className="container card shadow p-4 mb-4">
//         <h3>💡 Why is BMI Important?</h3>
//         <ul>
//           <li>Helps assess risks for diseases like diabetes and heart conditions.</li>
//           <li>Quick and easy health indicator.</li>
//           <li>Guides weight management goals.</li>
//         </ul>
//       </div>

      
//       <div className="container card shadow p-4">
//         <h3>⚠ Limitations of BMI</h3>
//         <ul className="text-danger">
//           <li>Does not measure body fat directly.</li>
//           <li>Does not consider muscle mass (athletes may have high BMI but be healthy).</li>
//           <li>Does not account for age, sex, or body composition.</li>
//         </ul>
//       </div>
//     </div>
//   </div>
//   );
// }

// export default About;


import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About BMI</h1>
        <p>Understand your Body Mass Index (BMI) and its importance for health.</p>
      </div>

      <div className="about-card">
        <h3>📌 What is BMI?</h3>
        <p>
          Body Mass Index (BMI) is a numerical value calculated from your weight and height.
          It is used to determine if you are underweight, normal weight, overweight, or obese.
        </p>
      </div>

      <div className="about-card">
        <h3>📊 How is BMI Calculated?</h3>
        <p>The BMI formula is:</p>
        <div className="bmi-formula">
          <p>BMI = <span className="text-primary">Weight (kg)</span> ÷ <span className="text-success">Height (m)²</span></p>
          <p>or</p>
          <p>BMI = <span className="text-primary">Weight (lb) × 703</span> ÷ <span className="text-success">Height (in)²</span></p>
        </div>
      </div>

      <div className="about-card">
        <h3>📋 BMI Categories</h3>
        <table className="bmi-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>BMI Range</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Underweight</td><td>BMI &lt; 18.5</td></tr>
            <tr><td>Normal Weight</td><td>18.5 - 24.9</td></tr>
            <tr><td>Overweight</td><td>25 - 29.9</td></tr>
            <tr><td>Obese</td><td>BMI ≥ 30</td></tr>
          </tbody>
        </table>
      </div>

      <div className="about-card">
        <h3>💡 Why is BMI Important?</h3>
        <ul>
          <li>Helps assess risks for diseases like diabetes and heart conditions.</li>
          <li>Quick and easy health indicator.</li>
          <li>Guides weight management goals.</li>
        </ul>
      </div>

      <div className="about-card about-warning">
        <h3>⚠ Limitations of BMI</h3>
        <ul>
          <li>Does not measure body fat directly.</li>
          <li>Does not consider muscle mass (athletes may have high BMI but be healthy).</li>
          <li>Does not account for age, sex, or body composition.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
