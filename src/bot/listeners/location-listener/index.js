require('dotenv').config();
const Extra = require('telegraf/extra');
const geoTz = require('geo-tz');

const locationListener = async (bot) => {
  bot.on('location', async (ctx, next) => {
    try {
      if (ctx.message && ctx.message.location) {
        const location = await geoTz(
          ctx.message.location.latitude,
          ctx.message.location.longitude,
        );
        ctx.deleteMessage();

        ctx.session.location = location[0];
        console.log(ctx.session);

        ctx.reply(
          `Thanks, your location 🌐:\n\n *${location}* `, // add location here
          { parse_mode: 'MarkdownV2' },
          Extra.markup((m) => m.removeKeyboard()),
        );
      }
    } catch (err) {
      console.log(err);
    }
    return next();
  });
};

module.exports = { locationListener };
