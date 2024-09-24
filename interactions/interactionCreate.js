
// events/interactionCreate.js
module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        console.log('An interaction was received'); // Add this line
        if (!interaction.isContextMenuCommand()) return;
        console.log('It is a context menu command'); // Add this line
        if (interaction.commandName === 'Create Linear Issue') {
            console.log('Create Linear Issue command triggered');

        if (interaction.commandName === 'Create Linear Issue') {
            const message = interaction.targetMessage;
            const content = message.content;
            const username = message.author.username;

            // Build the Linear URL
            const description = `Reported by ${"shitbreath"}:\n\n${"fucker"}`;
            const urlDescription = encodeURIComponent(description);

            const labels = 'bug'; // You can add more labels separated by commas
            const estimate = '3'; // Replace with desired estimate value

            const linearUrl = `https://linear.new?description=${urlDescription}&labels=${encodeURIComponent(labels)}&estimate=${encodeURIComponent(estimate)}`;

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
