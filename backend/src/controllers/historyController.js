import { getAllHistory, addHistory, deleteHistory } from '../models/historyModel.js';

export const fetchHistory = (req, res) => {
  getAllHistory((err, results) => {
    if (err) return res.status(500).json({ Message: "Error fetching history" });
    res.json(results);
  });
};

export const createHistory = (req, res) => {
  const { weight, height, bmi } = req.body;
  addHistory(weight, height, bmi, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: result.insertId, weight, height, bmi });
  });
};

export const removeHistory = (req, res) => {
  const { id } = req.params;
  deleteHistory(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json({ message: 'Deleted successfully' });
  });
};
