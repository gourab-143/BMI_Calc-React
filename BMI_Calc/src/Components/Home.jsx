import React, { useState } from 'react';
import '../styles/Home.css'


const Home = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();

    // if (!weight || !height || height <= 0) {
    //   setMessage('Please enter valid values.');
    //   setBmi(null);
    //   return;
    // }

    const bmiValue = (weight / (height * height)).toFixed(2);
    setBmi(bmiValue);
    getMessage(bmiValue);

    fetch('http://localhost:5000/api/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        weight:parseFloat(weight),
        height:parseFloat(height),
        bmi: bmiValue
      })
    })
      .then(res => res.json())
      .then(data => console.log('Record saved:', data))
      .catch(err => console.error('Error saving record:', err));
  };

  const getMessage = (bmi) => {
    if (bmi < 18.5) {
      setMessage('You are underweight');
    } else if (bmi > 18.5 && bmi < 25) {
      setMessage('You have normal weight');
    } else if (bmi > 25 && bmi < 29.9) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setMessage('');
  };

  return (
    <>
      {/* <div className='home-container'>
        <h1 className='title'>BMI Calculator</h1>

        <form onSubmit={calculateBMI} className='bmi-form'>
          <label>Weight (kg)</label>
          <input 
            type='number'
            value={weight}
            placeholder='Enter your weight in kg'
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <label>Height (m)</label>
          <input 
            type='number'
            value={height}
            placeholder='Enter your height in metres'
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <button type='submit'>Calculate</button>
          <button type='button' onClick={resetForm}>Reset</button>
        </form>

        {bmi && (
          <div className='result'>
            <h2>Your BMI is: {bmi}</h2>
            <p>{message}</p>
          </div>
        )}
      </div> */}

<div className='home-container'>
      <h1 className='title'>BMI Calculator</h1>

      <form onSubmit={calculateBMI} className='bmi-form'>
        <fieldset>
          <legend>Enter Your Details</legend>

          <div className='input-group'>
            <label htmlFor='weight'>Weight (kg):</label>
            <input
              id='weight'
              type='number'
              value={weight}
              placeholder='Enter weight in kg'
              onChange={(e) => setWeight(parseFloat(e.target.value) || '')}
            />
          </div>

          <div className='input-group'>
            <label htmlFor='height'>Height (m):</label>
            <input
              id='height'
              type='number'
              value={height}
              placeholder='Enter height in meters'
              onChange={(e) => setHeight(parseFloat(e.target.value) || '')}
            />
          </div>

          <div className='btn-group'>
            <button type='submit' className='calculate-btn'>Calculate</button>
            <button type='button' onClick={resetForm} className='reset-btn'>Reset</button>
          </div>
        </fieldset>
      </form>

      {bmi && (
        <div className='result-container'>
          <h2>Your BMI: <span className='bmi-value'>{bmi}</span></h2>
          <p className='bmi-message'>{message}</p>
        </div>
      )}
    </div>

      
    </>
  );
};

export default Home;
