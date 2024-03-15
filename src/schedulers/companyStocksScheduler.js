import cron from 'node-cron';
import { logger } from '../config'
import { companyStocksService } from '../services';
import { companyStocksConstants } from '../constants';
import { fetchCurrentFormatedDay } from '../utils';

const interval = companyStocksConstants.scheduler.interval;

const job = async () => {
    logger.info('Company Stocks: Scheduler Started');
    const currentDate = await fetchCurrentFormatedDay();
    const dataFound = await companyStocksService.checkIfDataExists(currentDate);
    if (dataFound) {
        logger.info({
            event: 'Scheduler: Data already added for Today. :-)',
            currentDate
        });
    } else {
        const companyStocks = await companyStocksService.fetchCompanyStocks() || [];
        logger.info({
            event: 'Scheduler: Fetch company stocks',
            companyStocks
        });
        if (companyStocks.length > 0) {
            const response = await companyStocksService.createCompanyStocks(companyStocks);
            logger.info(response);
        } else {
            logger.info({
                event: 'Scheduler: No company stocks found. :-)'
            });
        }
    }
}

cron.schedule(interval, job);