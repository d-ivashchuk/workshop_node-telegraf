const Stage = require('telegraf/stage');

const { updateHandler } = require('./updateHandlerWizard');

const stage = new Stage();

stage.register(updateHandler);

module.exports = { stage };
