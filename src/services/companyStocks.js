import moment from 'moment';
import { logger } from '../config'
import { Stocks } from '../db/models';
import { companyStocksConstants } from '../constants'
import { fetchJsonData, companyStocksParser } from '../utils';

export const createCompanyStocks = async (data = []) => {
    try {
        data = data.filter(val => val)
        logger.info({
            event: 'Service: New company stocks',
            data
        });
        const companyStocks = await Stocks.insertMany(data, { ordered: false }).catch(err => {
            logger.error(err);
        });
        logger.info({
            event: 'Service: Records added in Mongo DB',
            companyStocks
        });
        return companyStocks;
    } catch (err) {
        if (err.code === 11000) {
            logger.info('Service: Record already exists.');
        }
        logger.error(err);
    }
}

export const fetchStocksFromDB = async (records, page) => {
    try {
        const numberOfRecords = records || 10;
        const currentPage = page - 1 || 0;
        logger.info({
            event: 'Service: New Request Stocks from DB',
            data: {
                numberOfRecords,
                currentPage
            }
        });
        const stocks = await Stocks.find().skip(numberOfRecords * currentPage).limit(numberOfRecords);
        logger.info({
            event: 'Service: Stocks from DB',
            stocks
        });
        return {
            status: 'Success',
            statusCode: 200,
            count: stocks.length,
            data: stocks
        };
    } catch (err) {
        logger.error(err);
    }
}

export const fetchCompanyStocks = async () => {
    try {
        logger.info({
            event: 'Service: Request for Company Stocks '
        });
        let { stonkApiUrl, stonkApiHeaders, companies } = companyStocksConstants;
        const options = {
            headers: stonkApiHeaders
        };
        const companyStocks = [];
        const urls = companies.map(company => stonkApiUrl(company.key));
        for (let i in urls) {
            const response = await fetchJsonData(urls[i], options);
            const data = companyStocksParser.getCompanyStockParsedData(response, companies[i])
            companyStocks.push(data);
        }
        logger.info({
            event: `Service: All company stocks for ${moment().format('L').toString()}`,
            companyStocks
        });
        return companyStocks;
    } catch (err) {
        logger.error(err);
    }
}

export const checkIfDataExists = async (date) => {
    try {
        const stocks = await Stocks.find({ date });
        if (stocks.length > 0) {
            logger.info({
                event: 'Service: Stocks from DB for Today',
                stocks
            });
            return true;
        }
        return false;
    } catch (err) {
        logger.error(err);
    }
}