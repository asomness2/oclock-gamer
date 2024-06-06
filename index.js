// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
// Set important values in config.json
const { token, victim, server } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates ] });

// When the client is ready, run this code (only once)
// 'c' is used for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token set in /config.json
client.login(token);

// Set the client user's status
client.on('ready', () => {
	client.user.setStatus('idle');
});

// Monitor all voice channels then change a member's nickname when they join any
client.on('voiceStateUpdate', async (oldState, newState) => {
	if (!oldState.channelId && newState.channelId) {
		try {
			// Check the server ID then check the member ID that joined voice
			const guild = await client.guilds.fetch(server);
			const member = await guild.members.fetch(newState.member.id);
			const currentTime = new Date();
			// Check if the member who joined is the target member
			if (member.id === victim) {
				await member.setNickname(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/AM|PM/, 'gamer'));
			}
		}
		catch (error) {
			console.error(error);
		}
	}
});