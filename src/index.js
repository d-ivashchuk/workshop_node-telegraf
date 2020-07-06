require('dotenv').config();
const express = require('express');
const logger = require('pino')();

const app = express();

app.listen(process.env.PORT, async () => {
  try {
    logger.info(
      `🚀 Running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`,
    );
    require('./bot');
  } catch (error) {
    logger.error(error);
  }
});
