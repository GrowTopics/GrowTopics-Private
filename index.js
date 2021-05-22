const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "="

// THIS IS THE STATUS

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag} :)`);
    bot.user.setActivity("GrowTopics", {
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
    });

}
)

// THIS IS THE bot.login

bot.login(process.env.token);
