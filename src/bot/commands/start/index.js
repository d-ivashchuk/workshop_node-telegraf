const Markup = require('telegraf/markup');

module.exports = () => async (ctx) => {
  try {
    ctx.reply(
      `Hello ${ctx.from.first_name}, do you like to start getting your statistics ?`,
      Markup.inlineKeyboard([
        Markup.callbackButton('Yes', 'signInYes'),
        Markup.callbackButton('No', 'signInNo'),
      ]).extra(),
    );
  } catch (error) {
    console.log(error);
  }
};
