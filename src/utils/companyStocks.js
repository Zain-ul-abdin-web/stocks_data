import moment from 'moment';

export const getCompanyStockParsedData = (data, company) => {
    if (data.meta.status !== 200 || !data.body.primaryData) return undefined;
    data = data.body.primaryData
    return {
        companyCode: company.key,
        companyName: company.name,
        date: data.date = moment().format('L').toString(),
        price: parseFloat(data.lastSalePrice.replace('$', '')),
        changePoint: parseFloat(data.netChange.replace('+', '')),
        changePercentage: parseFloat(data.percentageChange.replace('+', '').replace('%', ''))
    }
}