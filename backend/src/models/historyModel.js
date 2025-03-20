import db from '../config/db.js';

export const getAllHistory = (callback) => {
  const sql = "SELECT * FROM history";
  db.query(sql, (err, results) => {
    callback(err, results);
  });
};

export const addHistory = (weight, height, bmi, callback) => {
  const sql = "INSERT INTO history (weight, height, bmi) VALUES (?, ?, ?)";
  db.query(sql, [weight, height, bmi], (err, result) => {
    callback(err, result);
  });
};

export const deleteHistory = (id, callback) => {
  const sql = "DELETE FROM history WHERE ID = ?";
  db.query(sql, [id], (err, result) => {
    callback(err, result);
  });
};
