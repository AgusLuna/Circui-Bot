const fs = require('node:fs');
const path = require('node:path');
const { Collection, Events} = require('discord.js');

//Get all command files in order to create commands from them
const commandFiles = [];
const commandsPath = path.join(__dirname, 'commands');

fs.readdirSync(commandsPath).forEach(directory => 
{
    fs.readdirSync(path.join(commandsPath, directory)).filter(files => files.endsWith('.js')).forEach(commandFile => 
    {
        commandFiles.push(commandFile);      
    });
});

//Get all events files in order to create commands from them
const eventFiles = [];
const eventsPath = path.join(__dirname, 'events');
fs.readdirSync(eventsPath).forEach(directory =>
{
    fs.readdirSync(path.join(eventsPath, directory)).filter(files => files.endsWith('.js')).forEach(eventFile =>
    {
        eventFiles.push(eventFile);
    });
});

client.commands = new Collection();

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
     //if (client.config.app.global) client.application.commands.set(CommandsArray);
     //else client.guilds.cache.get(client.config.app.guild).commands.set(CommandsArray);
    }
);

function Log(toLog)
{
    console.log(toLog);
}