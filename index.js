require('dotenv/config');
const { Client, IntentsBitField, REST, Routes } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const path = require('path');

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds],
});

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, 'slash-commands'),
  eventsPath: path.join(__dirname, 'events'),
});

client.login(process.env.TOKEN);

client.once('ready', async () => {
  console.log(`${client.user.username} is online.`);

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
