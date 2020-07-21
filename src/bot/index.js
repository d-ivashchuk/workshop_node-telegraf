require('dotenv').config();
const Telegraf = require('telegraf');
const RedisSession = require('telegraf-session-redis');
const rateLimit = require('telegraf-ratelimit');
const logger = require('pino')();

const { startCommand, statsCommand, locationCommand } = require('./commands');
const {
  startListener,
  locationListener,
  updateHandlerListener,
} = require('./listeners');
const { stage } = require('./wizards');
const { cbQueryMiddleware, settingsMenuMiddleware } = require('./middlewares');

const limitConfig = {
  window: 3000,
  limit: 2,
  onLimitExceeded: (ctx) => ctx.reply('Rate limit exceeded'),
};
const session = new RedisSession({
  store: {
    host: '127.0.0.1',
    port: 6379,
  },
});

const init = async (bot) => {
  //!middleware
  bot.use(session);
  // bot.use((ctx, next) => {
  //   ctx.reply(`Echo: ${ctx.update.message.text}`);
  //   next();
  // }); //TODO: first exercise middleware challenge
  bot.use(cbQueryMiddleware);
  bot.use(rateLimit(limitConfig));
  bot.use(stage.middleware());

  //! Set commands in bot
  bot.telegram.setMyCommands([
    { command: '/start', description: 'Start the bot' },
    { command: '/stats', description: 'Get twitter stats' },
    {
      command: '/location',
      description: 'Share your location with tweetastic',
    },
    { command: '/settings', description: 'Define your notification settings' },
    { command: '/me', description: 'Me is the command' },
  ]);

  //!listeners
  startListener(bot);
  locationListener(bot);
  updateHandlerListener(bot);

  //!commands
  bot.command('start', startCommand());
  bot.command('me', (ctx) => ctx.reply(ctx.update.message.from.id)); //TODO: second exercise
  bot.command('session', (ctx) => ctx.reply(ctx.session.twitterHandler)); //TODO: third exercise :: execute the command in a imported, structured way
  bot.command('stats', statsCommand());
  bot.command('settings', settingsMenuMiddleware.replyMenuMiddleware());
  bot.command('location', locationCommand());

  //!handlers
  bot.hears('t', async (ctx) => {
    try {
      ctx.reply('Running 🔥🔥🔥');
      console.log(ctx.session);
    } catch (error) {
      logger.error(error);
    }
  });

  bot.hears('x', (ctx) => {
    ctx.deleteMessage();
  });

  return bot;
};

init(new Telegraf(process.env.BOT_TOKEN))
  .then((bot) => {
    bot.launch();
    bot.use(settingsMenuMiddleware.init());
    bot.startPolling();
  })
  .catch((err) => console.log(err));
