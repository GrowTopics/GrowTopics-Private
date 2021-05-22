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

//DM Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('828250642312855562');
    if (command === "dm") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`${userID}`, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('a64636');
            embed.setTitle(`${message.author.username} has sent you a message!`);
            const attachment = message.attachments.first();
            if (attachment) embed.setImage(attachment.url);
            embed.setDescription(`<@${message.author.id}> \n ${content}`);
            embed.setThumbnail(message.author.avatarURL());
            embed.setFooter('User ID: ' + message.author.id);

            member.send(embed);

            message.channel.send(`Your message has been sent to <@${userID}>.`)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

bot.on('message', async message => {
    if (message.content === "=message-us") {
        const exampleEmbed = new Discord.MessageEmbed()
            .setTitle('How to use this channel!')
            .setDescription('Simply post any message or image (or both) in this channel and I will delete it, then I will forward your message to a channel that only the staff members can see~')

        message.channel.send(exampleEmbed);
    }

if (message.author.id === '845461877433696266') return
    if (message.channel.id == '845476275174506506' || !message.guild) {
        const embed = new Discord.MessageEmbed()
        const guild = bot.guilds.cache.get('842213244297936918');

        embed.setColor('ff55b2');
        embed.setTitle(`${message.author.tag} sent us a message!`);

        const attachment = message.attachments.first();
        if (attachment) embed.setImage(attachment.url);

        embed.setDescription(`<@${message.author.id}> \n ${message.content}`);
        embed.setThumbnail(message.author.avatarURL());
        embed.setFooter('User ID: ' + message.author.id);

        const msg = await bot.channels.cache.get('845476323005956116').send(embed)
        msg.react('❌');
        if (message.guild) message.delete();
    }
})

// THIS IS THE bot.login

bot.login(process.env.token);
