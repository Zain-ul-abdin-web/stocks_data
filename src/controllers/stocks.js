import { logger } from '../config';
import { companyStocksService } from "../services";

export const getStocks = async (req, res) => {
    const records = req.query.records;
    const page = req.query.page;
    const result = await companyStocksService.fetchStocksFromDB(records, page);
    logger.info({
        event: 'Controller: Records from DB',
        result
    })
    res.status(result.statusCode).json(result);
};