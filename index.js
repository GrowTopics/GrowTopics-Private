const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "="

// THIS IS THE STATUS

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag} :)`);
    bot.user.setActivity(`${bot.guilds.cache.size} users!`, {
        type: "WATCHING",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
    });

    //Remember Chat History
    const tdc = bot.guilds.cache.get('842213244297936918');
    tdc.channels.cache.filter(channel => channel.type != "voice" && channel.type != "category").forEach(channel => {
        channel.messages.fetch();

    })
});

bot.on('guildCreate', member => {
    bot.user.setActivity(`${bot.guilds.cache.size} users!`, { 
        type: "WATCHING", 
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
    });
})

bot.on('guildDelete', member => {
    bot.user.setActivity(`${bot.guilds.cache.size} users!`, { 
        type: "WATCHING", 
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
    });
})

//DM Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
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

//Message Inbox
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
                    await reaction.message.channel.send(`The invite link \`\`(${invite.url})\`\` has been disabled.`)
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

//Message Inbox Reactions
bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.channel.id === '845456151495311390') {
        const tdc = bot.guilds.cache.get('842213244297936918')
        if (user.id === bot.user.id) return
        if (reaction.message.author.id === bot.user.id) {
            if (reaction._emoji.name === '1️⃣') {
		    const member = guild.members.cache.find(member => member.id === user.id);
		    const embed = new Discord.MessageEmbed()
		    
		    .setColor('a64636')
            	    .setTitle('COMMANDS')
            	    .setDescription('Scam Type: Blue\nScam Rank: Blue\nLearn more about scam types / ranks here: [``[Click here]``](https://growtopia.cocomomc.xyz/scam-casino-games/scam-type-ranks)\n\n**Info:**\nDrop game is definitely one of the most iconic and oldest scams to exist in this game since its release. Drop games have been always played and hosted, despite how many warning and guides the developers and moderators have given us. Drop game is often hosted by one scammer, but uncommonly there might be helpers for the scammer, via lock accesses or consumables that freeze or kill you. How drop game works, is that the scammer is offering a prize for the player who drops the most valuable stuff compared to the other participants. The scammer might go on giving prizes during the first rounds to gain trust from players. However, after the scammer sees something really valuable being dropped, they will kick,ban you and steal your items. These items will most likely never again return to your inventory, as support will not return scammed items.\n\n**How to avoid:**\nTo say it shortly, don\'t play drop games at all. They are illegal, which alone will result in a curse, or a ban if you are hosting. There is never a legit though behind a drop game. There\'s always an evil plan behind one to steal your valuable items. You shouldn\'t play, even if the prizes are really good of if the scammer has given prizes during the first rounds.\n\nMore can be found in the world LEARNABOUTSCAMS or by going to https://growtopia.cocomomc.xyz/learn-about-scams')
            	    .setTimestamp()
		    
		    member.send(embed)
                await reaction.message.reactions.removeAll()
                await reaction.message.react('1️⃣')
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
                    await reaction.message.channel.send(`The invite link \`\`(${invite.url})\`\` has been disabled.`)
                } else {
                    return
                }
            }
        }
    }
});

//drop game command
bot.on('message', async message => {
    if (message.content === "=scam drop-game") {
        const embed = new Discord.MessageEmbed()
            .setColor('a64636')
            .setTitle('Drop Games')
            .setDescription('Learn more about drop games by reacting with a 1️⃣!')
        message.channel.send(embed);
	const msg = await bot.channels.cache.get('845456151495311390').send(embed)
        msg.react('1️⃣');
    }
})


// THIS IS THE bot.login

bot.login(process.env.token);
