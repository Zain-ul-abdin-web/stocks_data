import express from 'express';
import http from 'http';
import cors from "cors";
import { config, logger } from './config';
import router from './routes';
import './db';
import './schedulers';

const app = express();
app.use(cors());

// To keep Heroku app alive
setInterval(() => {
    http.get("http://healthcheck-backend-888c77da0ba5.herokuapp.com/");
    console.log("App is alive!");
  }, 20 * 60 * 1000);

app.use('/aircraft', router);
app.get('/', (req, res) => {
    console.log("Current directory:", __dirname);
    res.send('Welcome to Healthcheck App!');
});

const port = config.port;

app.listen(port, () => {
    logger.info(`App is running on port ${port}`);
});