const Eris = require('eris');
const config = require('./config.json');
const displayHelper = require('./src/DisplayHelper.js');
global.Order = require('./src/Order.js');
const util = require('util');

global.bot = new Eris(config.token, { intents: ['guildMessages'] });

bot.on('messageCreate', function(msg) {
	if (!msg.author)
		return;
	if (msg.content.startsWith('//exec') && msg.author.id == config.owner) {
		const content = {embed : { title : 'Code Injection Result'} };
		let result;
		try {
			result = util.inspect(eval(msg.content));
		} catch(e) {
			result = util.inspect(e);
		}
		content.embed.description = '```js\n' + result + '```';
		bot.createMessage(msg.channel.id, content).catch(e => console.error(e));
	}
});

/* bot.on('interactionCreate', function(interaction) {
	let options = {};
	let cmdName = "";
	let cmd;
	
	switch(interaction.type)
	{
		case 2 : switch(interaction.data.type)
		{
			case 1 : (interaction.data.options || []).forEach(e => options[e.name] = e.value);
			cmdName = interaction.data.name;
			break;
		}
		break;
		case 3 : var opt = interaction.data.custom_id.split(",");
		cmdName = opt.shift();
		opt.forEach(s => {
			var argMap = s.split(":");
			options[argMap[0]] = argMap[1];
		})
		break;
	}
	console.log(`${(interaction.member || {user : interaction.user}).user.id} : ${cmdName} ${Object.keys(options).map(k => k + ":" + options[k].replace(/,/g, "\\,")).join(",")}`);
}); */

bot.on('ready', function() {
	console.log('Démarrage réussi !');
	console.log(`Utilisateur connecté : ${bot.user.username} (<@${bot.user.id}>).`)
});

bot.connect().catch(e => console.error(e));