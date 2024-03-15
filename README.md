# Aircrafts Information System

## Getting Started
First, simply clone the repository

```
git clone https://github.com/Zain-ul-abdin-web/stocks_data
```
then install the dependencies
```
yarn install
or
npm install
```

### Prerequisites
```
Node V20.1.0
NPM V9.6.4
MongoDB
```

### Environment Variables
Create a `.env` file in root directory and add following parameters:
```shell
PORT=
MONGO_URL=
DB_NAME=
ENVIRONMENT= 'develoment' || 'production'
RAPID_API_HOST=yahoo-finance15.p.rapidapi.com
RAPID_API_KEY=
```

### Run the Application
```
yarn start
or
npm run start
```

### Schedulers
There is a schedulers running for stock job:
```
2. Stock API - Once a day [03:00 PM] Everyday
```

### APIs
3. Stocks Data
```
GET /aircraft/stocks?records=10&page=1
```