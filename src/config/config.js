const config = {
    mongoose: {
        url: `${process.env.MONGO_URL}${process.env.DB_NAME}`
    },
    environment: process.env.ENVIRONMENT,
    port: process.env.PORT,
    rapidApi: {
        key: process.env.RAPID_API_KEY,
        host: process.env.RAPID_API_HOST
    },
    newsDataApi: {
        key: process.env.NEWS_DATA_API_KEY
    }
};

export default config;