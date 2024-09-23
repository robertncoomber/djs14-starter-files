// events/interactionCreate.js
module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isContextMenuCommand()) return;

        if (interaction.commandName === 'Create Linear Issue') {
            const message = interaction.targetMessage;
            const content = message.content;
            const username = message.author.username;

            // Build the Linear URL
            const description = `Reported by ${username}:\n\n${content}`;
            const urlDescription = encodeURIComponent(description);

            const linearUrl = `https://linear.new?description=${urlDescription}`;

            // Create a button that links to the Linear URL
            const {
                ActionRowBuilder,
                ButtonBuilder,
                ButtonStyle,
            } = require('discord.js');

            const button = new ButtonBuilder()
                .setLabel('Create Linear Issue')
                .setURL(linearUrl)
                .setStyle(ButtonStyle.Link);

            const row = new ActionRowBuilder().addComponents(button);

            await interaction.reply({
                content: 'Click the button below to create a Linear issue:',
                components: [row],
                ephemeral: true,
            });
        }
    });
};