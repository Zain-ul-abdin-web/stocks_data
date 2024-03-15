import express from 'express';
import { companyStocksController } from '../controllers';

const stocksRouter = express.Router();

stocksRouter.route('/').get(companyStocksController.getStocks);

export default stocksRouter;