require('dotenv').config();
const { getCallbackParams } = require('../../utils/getCallbackParams');

const updateHandlerListener = (bot) => {
  bot.on('callback_query', async (ctx, next) => {
    try {
      const {
        callbackQuery: { data },
      } = ctx;
      const { callback, params } = getCallbackParams(data);

      if (callback === 'updateHandlerConfirm') {
        try {
          ctx.deleteMessage();
          ctx.session.twitterHandler = params.twitterHandler;
        } catch (error) {
          console.log(error);
        }
      }
      if (data === 'updateHandlerDecline') {
        ctx.deleteMessage();
        ctx.scene.enter('update-handler-wizard');
      }
      if (data === 'updateHandlerLeave') {
        ctx.deleteMessage();
        ctx.scene.leave();
      }
    } catch (err) {
      console.log(err);
    }
    return next();
  });
};

module.exports = { updateHandlerListener };
