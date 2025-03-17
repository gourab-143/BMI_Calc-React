import express from 'express'
import cors from 'cors'
import mysql from 'mysql'


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//Establishing a connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'gourab@123', 
  database: 'bmi'   
});


//checks the connection to MySQL db
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

 
//Fetching All BMI History Records
app.get('/api/history', (req, res) => {
  const sql = "SELECT  * FROM history";  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ Message: "Error fetching history" });
    res.json(results); 
  });
});



//Recieves BMI data from backend
app.post('/api/history', (req, res) => {
  const { weight, height, bmi } = req.body;
  const sql = "INSERT INTO history (weight, height, bmi) VALUES (?, ?, ?)";
  db.query(sql, [weight, height, bmi], (err, result) => {
    if (err) {
      console.error('Error inserting record:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(201).json({ id: result.insertId, weight, height, bmi });
  });
});



app.delete('/api/history/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM history WHERE ID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
