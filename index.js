const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./token.json')
const config = require('./config.json')
const girlListFile = require('./girllist.json')
const girlList = girlListFile.list

client.once('ready', () => {
    console.log('ready.')
    client.user.setActivity(`${config.prefix}help`); 
})

client.on('message', message => {
    if (message.content === `${config.prefix}random`) {
        message.channel.send(getGirl())
    }
    if (message.content === `${config.prefix}help`) {
        message.channel.send("Check ur dms")
        message.channel.type === (`"dm"`) + message.author.send({embed: {
			color: 000000,
			title: ("Commands:"),
			fields: [
			  { name: "Input", value: "m!random\nm!girl XX", inline: true},
			  { name: "Result", value: "Sends a random Monster Girl from the Monster Girl Wiki.\nreplace XX with the name of a gal and it'll send the cooresponding embed.", inline: true}
			]}			
		})
    }
    if (message.content.startsWith(`${config.prefix}girl`)) {
        let girl = getGirlFromName(message.content);
        message.channel.send(girl)
    }
})

const getGirl = () => {
    const numGirls = girlList.length
    const randomNum = Math.floor(Math.random()*(numGirls-1))
    const randomGirl = girlList[randomNum]
    const girlFile = require(`./entries/${randomGirl}.json`)
    const thumbnailURL = girlFile.thumbURL

    const girlEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(randomGirl)
        .setURL(girlFile.url)
        .setAuthor("Nokris, Supplicant to Savathûn", 'https://ihaveawebsite.tk/cdn/logo.png', 'https://ihaveawebsite.tk')
        .setThumbnail(thumbnailURL)
        .addFields(
            { name: 'Description', value: girlFile.reason },
            { name: '\u200B', value: '\u200B' },
            { name: 'rating', value: girlFile.rating, inline: true },
            { name: 'MGE URL', value: girlFile.url, inline: true },
        )
        .setTimestamp()
        .setFooter('Made by MVB', 'https://ihaveawebsite.tk/cdn/logo.png');
    console.log("Somebody used the bot.")
    return girlEmbed
}

const getGirlFromName = (name) => {
    name = name.slice(config.prefix.length + "girl".length + 1)
    const girlFile = require(`./entries/${name}.json`);
    const thumbnailURL = girlFile.thumbURL;

    const girlEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(girlFile.id)
        .setURL(girlFile.url)
        .setAuthor("Nokris, Supplicant to Savathûn", 'https://ihaveawebsite.tk/cdn/logo.png', 'https://ihaveawebsite.tk')
        .setThumbnail(thumbnailURL)
        .addFields(
            { name: 'Description', value: girlFile.reason },
            { name: '\u200B', value: '\u200B' },
            { name: 'rating', value: girlFile.rating, inline: true },
            { name: 'MGE URL', value: girlFile.url, inline: true },
        )
        /*
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/wSTFkRM.png')
        */
        .setTimestamp()
        .setFooter('Made by MVB', 'https://ihaveawebsite.tk/cdn/logo.png');
    console.log("Somebody used the bot.")
    return girlEmbed
}

client.login(token.token)