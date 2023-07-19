const getGirl = () => { 
    const numGirls = girlList.length; 
    const randomNum = Math.floor(Math.random() * (numGirls - 1)); 
    const randomGirl = girlList[randomNum]; 
    const girlFile = require(`./entries/${randomGirl}.json`); 
    const thumbnailURL = girlFile.thumbURL; 
    const girlEmbed = new Discord.EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(randomGirl)
        .setURL(girlFile.url)
        // .setAuthor("MVB", 'https://micahb.dev/FTP/Site_Media/Logo/Asset%201.png', 'https://micahb.dev')
        .setThumbnail(thumbnailURL)
        .addFields(
            { name: 'Description', value: girlFile.reason },
            { name: '\u200B', value: '\u200B' },
            { name: 'rating', value: girlFile.rating, inline: true },
            { name: 'MGE URL', value: girlFile.url, inline: true },)
        .setTimestamp()
        .setFooter({
            text: 'Made by MVB',
            iconURL: 'https://micahb.dev/logo_small_inverted.png'
        });
    console.log("Somebody used the bot.");
    return girlEmbed;
};

if (message.content === `${config.prefix}random`) {
    message.channel.send({
        embeds: [getGirl()]
    })
};