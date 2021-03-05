const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./token.json')
const config = require('./config.json')
const girlListFile = require('./girllist.json')
const girlList = girlListFile.list

client.once('ready', () => {
    console.log('ready.')
    client.user.setActivity(`${config.prefix}help | Update: m!list`); 
    // client.user.setActivity(`Bot is in dev mode. Do not touch.`); 
})

client.on('message', message => {
    if (message.content === `${config.prefix}random`) {
        message.channel.send(getGirl())
    }
    if (message.content === `${config.prefix}help`) {
        message.channel.send("Check your DMs.")
        message.channel.type === (`"dm"`) + message.author.send({embed: {
			color: 000000,
			title: ("Commands:"),
			fields: [
			  { name: "Input", value: "m!random\nm!girl XX\nm!list", inline: true},
			  { name: "Result", value: "Sends a random Monster Girl from the Monster Girl Wiki.\nreplace XX with the name of a gal and it'll send the cooresponding embed.\nLists all of the currently added MGs.", inline: true}
			]}			
		})
    }
    if (message.content.startsWith(`${config.prefix}girl`)) {
        const chosenGirl = message.content.slice(config.prefix.length + "girl".length + 1)
        message.channel.send(matchGirl(chosenGirl))
    }
    if (message.content === `${config.prefix}list`) {
        message.channel.send("Check your DMs.")
        message.channel.type === (`"dm"`) + message.author.send({embed: {
			color: 000000,
			title: ("Current Girls added in:"),
			fields: [
			  { name: "` `", value: getListEmbed(), inline: true},
			]}			
		})
    }
})

const getListEmbed = () => {
    const embedList = []
    girlList.forEach(element => embedList.push(`${element.slice(0)}\n`))
    return embedList
}

const matchGirl = (chosenGirl) => {
    for (let i = 0; i < girlList.length; i++) {
        console.log(girlList[i])
        if (chosenGirl === girlList[i]) {
            let girl = getGirlFromName(chosenGirl);
            return girl
        }
    }
    return "You either misspelled the MG's name or it is not added in yet."
}

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