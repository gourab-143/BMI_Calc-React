import express from 'express';
import { fetchHistory, createHistory, removeHistory } from '../controllers/historyController.js';

const router = express.Router();

router.get('/history', fetchHistory);
router.post('/history', createHistory);
router.delete('/history/:id', removeHistory);

export default router;
