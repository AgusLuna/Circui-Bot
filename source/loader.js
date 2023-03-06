const fs = require('node:fs');
const path = require('node:path');
const { Collection, Events} = require('discord.js');

//Get all events files in order to create commands from them
const eventFiles = [];
const eventsPath = path.join(__dirname, 'events');
fs.readdirSync(eventsPath).filter(files => files.endsWith('.js')).forEach(eventFile =>
{   
    eventFiles.push(path.join(eventsPath, eventFile));
});

console.log(`Loading events...`);

for (const file of eventFiles)
{
    const event = require(file);
    console.log(`-> [Loaded Event] ${event.eventName}`);
    
    client.on(event.eventName, event.funcToExec.bind(null, client));
    
    delete require.cache[require.resolve(file)];
}

//Get all command files in order to create commands from them
let commandFiles = [];
const commandsPath = path.join(__dirname, 'commands');

fs.readdirSync(commandsPath).forEach(directory => 
{
    commandFiles.push(fs.readdirSync(path.join(commandsPath, directory)).filter(files => files.endsWith('.js')));
});
console.log(commandFiles);
client.commands = new Collection();

console.log(`Loading commands...`);

let CommandsArray = [];

for (const newCommand of commandFiles) 
{
    const command = require(newCommand);
    
    if ('data' in command && 'execute' in command) 
    {
        CommandsArray.push(command);

        client.commands.set(command.data.name.toLowerCase(), command);
        console.log(`-> [Loaded Command] ${command.data.name.toLowerCase()}`);

        delete require.cache[require.resolve(newCommand)];
    } 
    else
    {
        console.log(`[failed Command]  ${newCommand}`);
    }
}


client.on('ready', (client) => 
    {
        console.log('ready: ' + client.config.app.token);
        if (client.config.app.global) client.application.commands.set(CommandsArray);
        else client.guilds.cache.get(client.config.app.guild).commands.set(CommandsArray);
    }
);

function Log(toLog)
{
    console.log(toLog);
}