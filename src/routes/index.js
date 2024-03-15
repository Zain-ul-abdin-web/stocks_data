import express from 'express';
import stocksRouter from './companyStocks';

const router = express.Router();

router.use('/stocks', stocksRouter);

export default router;