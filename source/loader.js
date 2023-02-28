const fs = require('node:fs');
const path = require('node:path');
const { Collection, Events} = require('discord.js');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const events = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();

CommandsArray = [];

console.log(`Loading events...`);

// for (const file of events) 
// {
//     const event = require(`../events/${file}`);
//     console.log(`-> [Loaded Event] ${file.split('.')[0]}`);
//     client.on(file.split('.')[0], event.bind(null, client));
//     delete require.cache[require.resolve(`../events/${file}`)];
// }

console.log(`Loading commands...`);

console.log(commandFiles);


// for (const newCommand of commandFiles) 
// {
//     const command = require(`../commands/${dirs}/${newCommand}`);
//     if (command.name && command.description) 
//     {
//         CommandsArray.push(command);
//
//         client.commands.set(command.name.toLowerCase(), command);
//         console.log(`-> [Loaded Command] ${command.name.toLowerCase()}`);
//
//         delete require.cache[require.resolve(`../commands/${dirs}/${newCommand}`)];
//     } 
//     else
//     {
//         console.log(`[failed Command]  ${command.name.toLowerCase()}`);
//     }
// }


client.on('ready', (client) => 
    {
     if (client.config.app.global) client.application.commands.set(CommandsArray);
     else client.guilds.cache.get(client.config.app.guild).commands.set(CommandsArray);
    }
);

function Log(toLog)
{
    console.log(toLog);
}