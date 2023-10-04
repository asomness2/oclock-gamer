// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates ] });

// When the client is ready, run this code (only once)
// 'c' is used for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

// Set the client user's status
client.on('ready', () => {
	client.user.setStatus('idle');
});

// change drake's name when he joins chat
client.on('voiceStateUpdate', async (oldState, newState) => {
	if (!oldState.channelId && newState.channelId) {
		try {
			const guild = await client.guilds.fetch('336343716539400194');
			const member = await guild.members.fetch(newState.member.id);
			const currentTime = new Date();
			// Check if the member who joined is the target member
			if (member.id === '125746463731875841') {
				await member.setNickname(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/AM|PM/, 'gamer'));
			}
		}
		catch (error) {
			console.error(error);
		}
	}
});
