require('dotenv').config();
const { getUserInfo } = require('../../../twitter');
const numbro = require('numbro');
const moment = require('moment-timezone');

module.exports = () => async (ctx) => {
  try {
    if (ctx.session.twitterHandler) {
      const result = await getUserInfo({
        twitterHandler: ctx.session.twitterHandler,
      });

      ctx.reply(
        `Hey _${result.name}_\n\nFollowers: *${numbro(
          result.followers_count,
        ).format({ thousandSeparated: true })}*\n\nLast tweet: *${moment(
          result.status.created_at,
          'ddd MMM D HH:mm:ss ZZ YYYY',
        )
          .tz(ctx.session.location)
          .format('ddd MMM D HH:mm:ss')}*`,
        {
          parse_mode: 'MarkdownV2',
        },
      );
    } else {
      ctx.reply('Register with /start command first');
    }
  } catch (error) {
    console.log(error);
  }
};
