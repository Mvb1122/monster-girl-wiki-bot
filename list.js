if (message.content === `${config.prefix}list`) {
    message.channel.send(`Check your DMs.`);
    message.author.send(
        { embeds: [
            { color: "000000", title: "Current Girls added in:", fields: [{name: ` `, value: embedList, inline: true},]}
        ]}
    );
}