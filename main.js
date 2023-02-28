const { Client, GatewayIntentBits } = require('discord.js');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    disableMentions: 'everyone',
});

client.config = require('./config.js');

require('./source/loader');

client.login(client.config.app.token);