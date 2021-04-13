const fs = require('fs');
const config = require('./config.json');

// Generate commandList on start
let commandListTemp = []
fs.readdirSync('./commands/').forEach(file => {
    commandListTemp.push(`"${file.slice(0,-5)}"`);
});
console.log('commandListTemp generated.')
let commandListTempJson = `{\n\t"list": [${commandListTemp}]\n}`
fs.writeFileSync('./commandlist.json', commandListTempJson)
console.log(`List generation complete.`)
const commandListFile = require('./commandlist.json')
const commandList = commandListFile.list

// Remember: #1 is the informational one, #2 is the one with the prefix+suffix.

let helpList1 = " ";
let helpList2 = " ";
for (i = 0; i < commandList.length; i ++) {
    const command = require(`./commands/${commandList[i]}.json`);
    console.log(command.helpCommand);
    helpList1 = helpList1 + `\n${command.helpCommand}`;
    helpList2 = helpList2 + `\n${command.suffix}`;
}

console.log(`\n\nBEGIN HELPLIST1:${helpList1}`);
console.log(`\n\nBEGIN HELPLIST2:${helpList2}`);