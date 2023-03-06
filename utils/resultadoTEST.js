const { ApplicationCommandOptionType, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { JSZip } = require('jszip');
const { google } = require("googleapis");

const credentialFilename = "circuitolatamaoe-d053c02af441.json";
const scopes = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({keyFile: credentialFilename, scopes: scopes});
const drive = google.drive({ version: "v3", auth });

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('resultado')
        .setDescription('')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute({ inter }) {
        await DisplayText(config.templates_file_token, inter);
    },
    
}

module.exports = {
    name: 'resultado',
    description: "Declarar resultado del Circuito Latinoamericano",
    voiceChannel: false,
    options: [
        {
            name: 'division',
            description: 'division en la que jugas D',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'grupo',
            description: 'grupo al que pertenecen',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'fecha',
            description: 'Ronda que jugaron',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'jugador',
            description: 'Usuario del Jugador 1',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'puntosjugador',
            description: 'Cantidad de partidas que gano el jugador 1',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'otrojugador',
            description: 'Usuario del Jugador 2',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'puntosotrojugador',
            description: 'Cantidad de partidas que gano el jugador 2',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'draftmapas',
            description: 'Link del draft de mapas',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'draftcivis',
            description: 'Link del draft de civilizaciones',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'partida 1',
            description: 'primer partida jugada',
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        },
        {
            name: 'partida 2',
            description: 'segunda partida jugada',
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        },
        {
            name: 'partida 3',
            description: 'tercera partida jugada (de no existir adjuntar otra repetida)',
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        }
    ],

   async execute({ inter }) {          
       	await DisplayText(templates_file_token, inter);      
    },
};

function DisplayText(ID, interpreter)
{    
    return drive.files.export(
    {fileId: ID,mimeType:"text/plain"},
      (err, res) => 
      {
        if (err) return console.log("Getting file: " + err);
       
        var NewData = res.data;
        NewData = NewData.split('/////////////////////////////////////////////////////////////////////////////////////////////////////')[1];
        
        const Category = interpreter.options.getString('division');
       	const Group = interpreter.options.getInteger('grupo');
        const Date = interpreter.options.getInteger('fecha');
        const Player1 = interpreter.options.getUser('jugador');
        const Score1 = interpreter.options.getInteger('puntosjugador');
        const Player2 = interpreter.options.getUser('otrojugador');
        const Score2 = interpreter.options.getInteger('puntosotrojugador');
        const draftmapas = interpreter.options.getString('draftmapas');
        const draftcivis = interpreter.options.getString('draftcivis');
        const matchone = interpreter.options.getAttachment('partida 1');
        const matchtwo = interpreter.options.getAttachment('partida 1');
        const matchthree = interpreter.options.getAttachment('partida 1');

        //zipper = new JSZip();
        //const matches = zipper.file();
        
        NewData = ParseDoc(NewData, [Player1, Player2],[Group,Date,Score1,Score2],[Category,draftmapas,draftcivis]);
          
        interpreter.reply({content:NewData, files:[matches]});
      }
    );
}

function ParseDoc(msj, players, numbers, strings)
{
   //Players Parse
    msj = msj.replace('${Player1}', '<@'+players[0].id+'>');
    msj = msj.replace('${Player2}', '<@'+players[1].id+'>');
    
    //Numbers Parse
    msj = msj.replace('${Group}', numbers[0]);
    msj = msj.replace('${Date}', numbers[1]);
    msj = msj.replace('${Score1}', numbers[2]);
    msj = msj.replace('${Score2}', numbers[3]);
    msj = msj.replace('${Horario}', numbers[4]);
        
    //Strings Parse
    msj = msj.replace('${Category}', strings[0]);
    msj = msj.replace('${draftmapas}', strings[1]);
    msj = msj.replace('${draftcivis}', strings[2]);
    msj = msj.replace('${Day}', strings[4]);
    return msj;
}

