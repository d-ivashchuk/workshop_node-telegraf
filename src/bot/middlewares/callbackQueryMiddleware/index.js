require('dotenv').config();
const { getCallbackParams } = require('../../utils/getCallbackParams');
const logger = require('pino')();

const cbQueryMiddleware = async (ctx, next) => {
  if (process.env.NODE_ENV === 'development') {
    if (ctx.updateType === 'callback_query') {
      const cbq = ctx.update.callback_query.data;
      const { callback, params } = getCallbackParams(cbq);
      logger.info(`CB query: ${callback}`);
      const paramsLogger = logger.child(params);
      paramsLogger.info('Params');
    }
  }

  return next();
};
module.exports = { cbQueryMiddleware };
