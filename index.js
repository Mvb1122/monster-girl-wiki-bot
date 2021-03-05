const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./token.json')
const config = require('./config.json')
const girlListFile = require('./girllist.json')
const girlList = girlListFile.list

client.once('ready', () => {
    console.log('ready.')
})

client.on('message', message => {
    if (message.content === `${config.prefix}test`) {
        message.channel.send('Yahoo, it worked.')
    }
    if (message.content === `${config.prefix}random`) {
        message.channel.send(getGirl())
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
        /*
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/wSTFkRM.png')
        */
        .setTimestamp()
        .setFooter('Made by MVB', 'https://ihaveawebsite.tk/cdn/logo.png');
    return girlEmbed
}

client.login(token.token)