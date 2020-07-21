require('dotenv').config();

const startListener = async (bot) => {
  bot.on('callback_query', async (ctx, next) => {
    try {
      const {
        callbackQuery: { data },
      } = ctx;

      if (data === 'signInYes') {
        ctx.deleteMessage();
        ctx.scene.enter('update-handler-wizard');
      }
      if (data === 'signInNo') {
        ctx.reply('Ok, run /start any time');
      }
    } catch (err) {
      console.log(err);
    }
    return next();
  });
};

module.exports = { startListener };
