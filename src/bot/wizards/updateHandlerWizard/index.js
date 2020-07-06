const WizardScene = require('telegraf/scenes/wizard');
const Markup = require('telegraf/markup');

const updateHandler = new WizardScene(
  'update-handler-wizard',
  async (ctx) => {
    ctx.reply('Please, enter your twitter handler');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.message) {
      await ctx.deleteMessage();
      return ctx.scene.leave();
    }
    ctx.wizard.state.twitterHandler = ctx.message.text;
    ctx.reply(
      `Do you want to use ${ctx.wizard.state.twitterHandler} as your twitter handler?`,
      Markup.inlineKeyboard([
        Markup.callbackButton(
          'Yes',
          `updateHandlerConfirm${
            ctx.wizard.state.twitterHandler &&
            `?twitterHandler=${ctx.wizard.state.twitterHandler}`
          }`,
        ),
        Markup.callbackButton('No', 'updateHandlerDecline'),
        Markup.callbackButton('Leave', 'updateHandlerLeave'),
      ]).extra(),
    );
    return ctx.scene.leave();
  },
);

module.exports = { updateHandler };
