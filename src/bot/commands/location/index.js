require('dotenv').config();
const Extra = require('telegraf/extra');

module.exports = () => async (ctx) => {
  try {
    ctx.reply(
      'Share your location and get notifications in your correct timezone',
      Extra.markup((markup) => {
        return markup
          .resize()
          .keyboard([markup.locationRequestButton('Send location')]);
      }),
    );
  } catch (error) {
    console.log(error);
  }
};
