const { ApplicationCommandOptionType } = require('discord.js');
const { google } = require('googleapis');
const configFile = require('../../../config.js');

const credentialFilename = "circuitolatamaoe-d053c02af441.json";
const scopes = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({keyFile: credentialFilename, scopes: scopes});
const drive = google.drive({ version: "v3", auth });

module.exports = {
    name: 'acordado',
    description: "Declarar horario en el que jugarian",
    voiceChannel: false,
    options: [
        {
            name: 'division',
            description: 'division en la que jugas',
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
            name: 'otrojugador',
            description: 'Usuario del Jugador 2',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'dia',
            description: 'Dia en el que jugarian DD/MM',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'horario',
            description: 'Horario en el que jugarian HHT',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'gmt',
            description: 'GMT del horario - si no se usa se asume horario GMT-3(Arg)',
            type: ApplicationCommandOptionType.Integer,
            required: false,
        },
    ],

   async execute({ inter }) {          
       	await DisplayText(configFile.templates_file_token, inter); 
    },
};

function DisplayText(ID, interpreter)
{    
    interpreter.deferReply();
    return drive.files.export(
    {fileId: ID,mimeType:"text/plain"},
      (err, res) => 
      {
        if (err) return console.log("Getting file: " + err);
       
        var NewData = res.data;
        NewData = NewData.split('/////////////////////////////////////////////////////////////////////////////////////////////////////')[2];
        
        const Category = interpreter.options.getString('division');
       	const Group = interpreter.options.getInteger('grupo');
        const Date = interpreter.options.getInteger('fecha');
        const Player1 = interpreter.options.getUser('jugador');   
        const Player2 = interpreter.options.getUser('otrojugador');
        const Day = interpreter.options.getString('dia');
        const Hour = interpreter.options.getInteger('horario');
        const GMT = interpreter.options.getInteger('gmt');
        var GMTString = 'GMT' + GMT;        
        if(GMT == null)
        {
            GMTString = 'GMT-3(Arg)';
        }
          
        NewData = ParseDoc(NewData, [Player1, Player2],[Group,Date,'','',Hour],[Category,'','',Day, GMTString]);
          
        interpreter.editReply({content:NewData});
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
    msj = msj.replace('${Day}', strings[3]);
    msj = msj.replace('${GMT}', strings[4]);
    return msj;
}

