require('dotenv/config');
const { Client, IntentsBitField, REST, Routes,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,} = require('discord.js');
const { CommandHandler } = require('djs-commander');
const path = require('path');

console.log('Bot is starting...');
const client = new Client({
  intents: [IntentsBitField.Flags.Guilds],
});

new CommandHandler({
  client,
  eventsPath: path.join(__dirname, 'interactions'),
});

client.login(process.env.TOKEN);

client.once('ready', async () => {
  console.log(`${client.user.username} is online.`);
  // Set up interaction handling
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isContextMenuCommand()) return;
    if (interaction.commandName === 'Create Linear Issue') {
      try {
        const message = interaction.targetMessage;
        const content = message.content;
        const username = message.author.username;
        // Build the Linear URL
        const description = `Reported by ${username}:\n\n${content}`;
        const urlDescription = encodeURIComponent(description);
        const linearUrl = `https://linear.new?description=${urlDescription}`;
        // Create a button that links to the Linear URL
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
      } catch (error) {
        console.error('Error handling context menu command:', error);
        await interaction.reply({ content: 'An error occurred while processing the command.', ephemeral: true });
      }
    }
  });
  // Register the context menu command
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  const commands = [
    {
      name: 'Create Linear Issue',
      type: 3, // 3 is for MESSAGE context menu command
    },
  ];

  try {
    await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: commands },
    );
    console.log('Successfully registered context menu command.');
  } catch (error) {
    console.error(error);
  }
});