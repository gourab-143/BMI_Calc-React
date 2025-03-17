import React,{useState,useEffect} from 'react'
import './History.css';

const History = () => {

const[history,setHistory]=useState([]);

useEffect(()=>{
  fetch('http://localhost:5000/api/history')
    .then((res)=>res.json())
    .then((data) => {
      console.log("Fetched Data:", data);
      if (Array.isArray(data)) {
        setHistory(data);
      } else {
        console.error("Error: Data is not an array!", data);
        setHistory([]);
      }
    })
    .catch((err) => {
      console.error('Error fetching history', err);
      setHistory([]);
    });

},[])


const handleDelete = (id)=>{
  fetch(`http://localhost:5000/api/history/${id}`,{method:'DELETE'})

  .then((res) => res.json())
  .then(() => {
    // Update state to reflect the deleted record
    setHistory((prevHistory) => prevHistory.filter(history => history.ID !== id))
  })
  .catch((err) => console.error('Error deleting record:', err));

}


  return (
    
    <div className="history-container mt-5">
      <h1>History</h1>
      <ul className="list-group">
        {history.length === 0 ? (
          <li className="list-group-item">No history available.</li>
        ) : (
          history.map((history,index) => (
            <li key={history.ID || index} className="list-group-item d-flex justify-content-between align-items-center">
              Weight: {history.Weight} kg, Height: {history.Height} m, BMI: {history.BMI}
              <button className="btn btn-danger" onClick={() => handleDelete(history.ID)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
    
  )
}

export default History
