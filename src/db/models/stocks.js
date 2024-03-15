import mongoose from 'mongoose';

const stocks = new mongoose.Schema({
    companyCode: {
        type: String,
        require: true
    },
    companyName: {
        type: String,
        require: true
    },
    price: {
        type: Number
    },
    changePoint: {
        type: Number
    },
    changePercentage: {
        type: Number
    },
    date: {
        type: String,
    }
});
const Stocks = mongoose.model('Stocks', stocks);

export default Stocks;