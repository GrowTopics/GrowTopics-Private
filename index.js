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

    //Remember Chat History
    const tdc = bot.guilds.cache.get('842213244297936918');
    tdc.channels.cache.filter(channel => channel.type != "voice" && channel.type != "category").forEach(channel => {
        channel.messages.fetch();

    })
});

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

        embed.setColor('a64636');
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

//Message Inbox Reactions
bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.channel.id === '845476323005956116') {
        const tdc = bot.guilds.cache.get('842213244297936918')
        if (user.id === bot.user.id) return
        if (reaction.message.author.id === bot.user.id) {
            if (reaction._emoji.name === '❌') {
                await reaction.message.reactions.removeAll()
                await reaction.message.react('✅')
            }
            if (reaction._emoji.name === '✅') {
                await reaction.message.reactions.removeAll()
                await reaction.message.react('❌')
            }
            if (reaction._emoji.name === '🚫') {
                const description = reaction.message.embeds[0].description
                const invites = await tdc.fetchInvites();
                const invite = invites.find(invite => invite.url === description);
                if (invite) {
		    await reaction.message.reactions.removeAll()
                    await invite.delete();
                    await reaction.message.channel.send(`${invite.url} Invite link disabled.`)
                } else {
                    return
                }
            }
        }
    }
});

//Invite Tracker
bot.on('inviteCreate', async invite => {
	const inviteEmbed = new Discord.MessageEmbed()
	        inviteEmbed.setColor('a64636')
		inviteEmbed.setTitle(`${invite.inviter.tag} has created an invite link!`)
		inviteEmbed.setDescription(`${invite.url}`)
		inviteEmbed.setFooter(`User ID: ${invite.inviter.id}`)
	const invPost = await bot.channels.cache.get('845476323005956116').send(inviteEmbed)
	await invPost.react('🚫');
})

// THIS IS THE bot.login

bot.login(process.env.token);
