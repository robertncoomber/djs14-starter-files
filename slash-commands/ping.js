const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  run: ({ interaction }) => {
    const button = new ButtonBuilder()
      .setLabel('Open Linear')
      .setURL('https://linear.app')
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(button);

    interaction.reply({
      content: 'Pong!',
      components: [row]
    });
  },

  data: {
    name: 'ping',
    description: 'Pong! And open Linear',
  },
};