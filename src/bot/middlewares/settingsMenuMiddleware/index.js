const TelegrafInlineMenu = require('telegraf-inline-menu');

const settingsMenuMiddleware = new TelegrafInlineMenu(
  'When you would like to get an update on followers?',
);

settingsMenuMiddleware.urlButton(
  'Your twitter page',
  (ctx) => `www.twitter.com/${ctx.session.twitterHandler}`,
);

settingsMenuMiddleware.simpleButton(
  (ctx) => ctx.session.twitterHandler || 'Update handler',
  'twitterHandler',
  {
    doFunc: async (ctx) => console.log(123, ctx),
  },
);

module.exports = { settingsMenuMiddleware };
