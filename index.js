const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const token = require('./token.json')
const config = require('./config.json')

// Generate GirlList on start
let girlListTemp = []
fs.readdirSync('./entries/').forEach(file => {
    girlListTemp.push(`"${file.slice(0,-5)}"`);
});
console.log('girlListTemp generated.')
let girlListTempJson = `{\n\t"list": [${girlListTemp}]\n}`
fs.writeFileSync('./girllist.json', girlListTempJson)
console.log(`girlList generation complete.`)

const girlListFile = require('./girllist.json')
const girlList = girlListFile.list

// Generate commandList on start
let commandListTemp = []
fs.readdirSync('./commands/').forEach(file => {
    commandListTemp.push(`"${file.slice(0,-5)}"`);
});
console.log('commandListTemp generated.')
let commandListTempJson = `{\n\t"list": [${commandListTemp}]\n}`
fs.writeFileSync('./commandlist.json', commandListTempJson)
console.log(`Command list generation complete.`)
const commandListFile = require('./commandlist.json')
const commandList = commandListFile.list

// Remember: #1 is the informational one, #2 is the one with the prefix+suffix.

let helpList1 = " ";
let helpList2 = " ";
let helpList2Array = [];
for (i = 0; i < commandList.length; i ++) {
    const command = require(`./commands/${commandList[i]}.json`);
    // console.log(command.helpCommand);
    helpList1 = helpList1 + `\n${command.helpCommand}`;
    helpList2 = helpList2 + `\n${config.prefix}${command.suffix}`;
    helpList2Array.push(command.suffix);
}

// Generate list of girls for m!list.
const embedList = [];
girlList.forEach(element => embedList.push(`${element.slice(0)}\n`));

// Generate html files for website.
let webPageButtons = " ";
for (i = 0; i < girlList.length; i++) {
    webPageButtons += (`<button type=\"button\" onclick=\"display('${girlList[i]}')\">${girlList[i]}</button>`);
}
const webPage = "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width\"><title>MGE Reviews</title></head><body>Pick your poison:<br>" + webPageButtons + "<p id=\"demo\"></p><p id=\"rating\" style=\"font-size:50\"></p><script>let display = (fileName) => {fetch(`entries/${fileName}.json`).then(response => response.json()).then(data => display2(data));}\nlet display2 = (data) => {document.getElementById(\"demo\").innerHTML =  data.reason;document.getElementById(\"rating\").innerHTML =  data.rating;}</script></body></html>"
fs.writeFileSync('./webPageFiles/webpage.html', webPage);

client.once('ready', () => {
    console.log('ready.')
    client.user.setActivity(`${config.prefix}help`); 
    // client.user.setActivity(`Bot is in dev mode. Do not touch.`);
})

client.on('message', message => {
    // Load and run command if it's in the files.
    for (i = 0; i < helpList2Array.length; i++) {
        // console.log(helpList2Array[i]);
        if (message.content.startsWith(`${config.prefix}${helpList2Array[i]}`)) {
            const commandName = helpList2Array[i].slice(config.prefix.length - 2);
            // console.log(commandName);
            const commandFile = `./commands/${commandName}.json`;
            let command = fs.readFileSync(commandFile);
            command = JSON.parse(command);
            eval(command.code);
        }
    }

    if (message.content === `${config.prefix}help`) {
        message.channel.send("Check your DMs.")
        message.channel.type === (`"dm"`) + message.author.send({embed: {
			color: 000000,
			title: ("Commands:"),
			fields: [
			  { name: "Input", value: `${helpList2}`, inline: true},
			  { name: "Result", value: `${helpList1}`, inline: true}
			]}			
		})
    }

    // I had to leave the girl command as normal because it's made of too many parts, or whatever.
    if (message.content.startsWith(config.prefix + "girl")){
        let getGirlFromName = ( name ) =>
        {
        let girlFile = require( `./entries/${name}.json` );
        let thumbnailURL = girlFile.thumbURL;
        let girlEmbed = new Discord.MessageEmbed().setColor( '#0099ff' ).setTitle( girlFile.id ).setURL( girlFile.url ).setAuthor( 'MVB', 'https://ihaveawebsite.tk/logo_small_inverted.png', 'https://ihaveawebsite.tk' ).setThumbnail( thumbnailURL ).addFields(
        {
            name: 'Description',
            value: girlFile.reason
        },
        {
            name: '​',
            value: '​'
        },
        {
            name: 'rating',
            value: girlFile.rating,
            inline: true
        },
        {
            name: 'MGE URL',
            value: girlFile.url,
            inline: true
        } ).setTimestamp().setFooter( 'Made by MVB', 'https://ihaveawebsite.tk/cdn/logo.png' );
        console.log( 'Somebody used the bot.' );
        return girlEmbed
        }
        let matchGirl = ( chosenGirl ) =>
        {
        for ( let i = 0; i < girlList.length; i++ )
        {
            if ( chosenGirl === girlList[ i ] )
            {
            let girl = getGirlFromName( chosenGirl );
            return girl;
            }
        }
        return 'You either misspelled the MGs name or it is not added in yet.';
        }
        if ( message.content.startsWith( `${config.prefix}girl` ) )
        {
            let chosenGirlMSG = message.content.slice( config.prefix.length + 'girl'.length + 1 );
            message.channel.send( matchGirl( chosenGirlMSG ) );
        }
    }
})



client.login(token.token)
