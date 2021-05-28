const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "="

// THIS IS THE STATUS

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag} :)`);
    bot.user.setActivity(`www.growtopics.xyz`, {
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
            embed.setColor('14242c');
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

        embed.setColor('14242c');
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
	        inviteEmbed.setColor('14242c')
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
            if (reaction._emoji.name === 'DropGame') {
		    const guild = bot.guilds.cache.get('842213244297936918');
		    const member = guild.members.cache.find(member => member.id === user.id);
		    const embed = new Discord.MessageEmbed()
		    
		    .setColor('14242c')
		    .setThumbnail('https://cdn.discordapp.com/emojis/846103300214095883.png?v=1')
            	    .setTitle('Drop Game')
            	    .setDescription('Scam Type: Blue\nScam Rank: Blue\nLearn more about scam types / ranks here: [``[Click here]``](https://growtopia.cocomomc.xyz/scam-casino-games/scam-type-ranks)\n\n**Info:**\nDrop game is definitely one of the most iconic and oldest scams to exist in this game since its release. Drop games have been always played and hosted, despite how many warning and guides the developers and moderators have given us. Drop game is often hosted by one scammer, but uncommonly there might be helpers for the scammer, via lock accesses or consumables that freeze or kill you. How drop game works, is that the scammer is offering a prize for the player who drops the most valuable stuff compared to the other participants. The scammer might go on giving prizes during the first rounds to gain trust from players. However, after the scammer sees something really valuable being dropped, they will kick,ban you and steal your items. These items will most likely never again return to your inventory, as support will not return scammed items.\n\n**How to avoid:**\nTo say it shortly, don\'t play drop games at all. They are illegal, which alone will result in a curse, or a ban if you are hosting. There is never a legit though behind a drop game. There\'s always an evil plan behind one to steal your valuable items. You shouldn\'t play, even if the prizes are really good of if the scammer has given prizes during the first rounds.\n\nMore can be found in the world LEARNABOUTSCAMS or by going to https://growtopia.cocomomc.xyz/learn-about-scams')
            	    .setTimestamp()
		    
		    member.send(embed)
                await reaction.message.reactions.removeAll()
                await reaction.message.react('846103300214095883')
		await reaction.message.react('846103514508951563')
		await reaction.message.react('846167025565958154')
	    }
		    if (reaction._emoji.name === 'TrustGame') {
		    const guild = bot.guilds.cache.get('842213244297936918');
		    const member = guild.members.cache.find(member => member.id === user.id);
		    const embed = new Discord.MessageEmbed()
		    
		    .setColor('14242c')
		    .setThumbnail('https://cdn.discordapp.com/emojis/846103514508951563.png?v=1')
            	    .setTitle('Trust Game')
            	    .setDescription('Scam Type: Blue\nScam Rank: Blue\nLearn more about scam types / ranks here: [``[Click here]``](https://growtopia.cocomomc.xyz/scam-casino-games/scam-type-ranks)\n\n**Info:**\nTrust game has two different types, where the first one resembles a drop game. Technically, it\'s a drop game but the scammer has just covered it with a different name. How the first type works is that the scammer will ask the players to drop, and the person who has \"trusted\" the most valuable stuff wins the prize. Different from drop game, the scammer might ask you not to take the item immediately to show your trust. The second trust game works when you\'re alone together with the scammer, where you show your trusts by dropping own items to close to each other. This is often made between friends, but there will most likely be a certain amount of value that the scammer wants before they will scam you. Even if the other participant is only your Growtopia friend, you shouldn\'t completely trust an internet stranger.\n\n**How to avoid:**\nThe best way to avoid one is by not playing. Like drop game, this also is illegal and will result in a curse if you get caught red-handed. The scammer might also first donate you a free WL to gain your trust before the trust game itself. In that case, after you have received you WL, leave and don\'t participate.\n\nMore can be found in the world LEARNABOUTSCAMS or by going to https://growtopia.cocomomc.xyz/learn-about-scams')
            	    .setTimestamp()
		    
		    member.send(embed)
                await reaction.message.reactions.removeAll()
		await reaction.message.react('846103300214095883')
                await reaction.message.react('846103514508951563')
		await reaction.message.react('846167025565958154')
            }
		if (reaction._emoji.name === 'WorldTradeWithFloatingItems') {
		    const guild = bot.guilds.cache.get('842213244297936918');
		    const member = guild.members.cache.find(member => member.id === user.id);
		    const embed = new Discord.MessageEmbed()
		    
		    .setColor('14242c')
		    .setThumbnail('https://cdn.discordapp.com/emojis/846167025565958154.png?v=1')
            	    .setTitle('World Trade With Floating Items')
            	    .setDescription('Scam Type: Black\nScam Rank: Black\nLearn more about scam types / ranks here: [``[Click here]``](https://growtopia.cocomomc.xyz/scam-casino-games/scam-type-ranks)\n\n**Info:**\nWorld trade scamming was popular around 2014, before the developers patched this by not allowing to trade world keys if the world contains floating items. This scam was done by selling a world with often highly expensive items dropped somewhere in the world, for extremely cheap. Several tricks were used, suck as joining the world to a door near that item, taking the item after trade and/or using checkpoints. This world trade scam ended up being a popular way to scam fail scammers, which also was popular series to be seen on Youtube back then.\n\nMore can be found in the world LEARNABOUTSCAMS or by going to https://growtopia.cocomomc.xyz/learn-about-scams')
            	    .setTimestamp()
		    
		    member.send(embed)
                await reaction.message.reactions.removeAll()
		await reaction.message.react('846103300214095883')
                await reaction.message.react('846103514508951563')
		await reaction.message.react('846167025565958154')
            }
	
       }
};
})

// MESSAGE COMMANDS ------------------------------

//Channel #scams command
bot.on('message', async message => {
    if (message.content === "=channel <#845456151495311390>") {
	    message.delete().catch(O_o => { });
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Scams')
            .setDescription('Drop Games : <:DropGame:846103300214095883>\nTrust Games : <:TrustGame:846103514508951563>\nWorld Trade With Floating Items : <:WorldTradeWithFloatingItems:846167025565958154>')
	const msg = await bot.channels.cache.get('845456151495311390').send(embed)
        msg.react('846103300214095883');
	msg.react('846103514508951563');
	msg.react('846167025565958154');
    }
})

//Channel #🔓next-cup command
bot.on('message', async message => {
    if (message.content === "=channel <#847605635449094174>") {
	    message.delete().catch(O_o => { });
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Next Cup')
            .setDescription('This is the place where people level up their work status (moving to the next cup level). Here is a list of roles roles.\n\n```Roles:```\n<@842217030911262741>\n<@847606980596334623>\n<@842216986565541899>\n<@847605026184364052>\,<@847603055972974633>\nFor a list of what each role does, go to <#847606515207766089>!\n\n```Cups:```\n<@843328528597647392>\n<@843328508541140992>\n<@843328486982156288>\n<@843328466232410114>\n<@843328448151158784>\n<@843328427864227871>\n<@843328406674210846>\n<@843328254941331496>\n<@843328165475778560>\n<@843328090608631828>\n\nIf the staff level up to another cup, they will be able to see the level up message here. If you end up leaving the discord server and joining back, your staff role(s) will disappear, but your cup role(s) will not.')
	const msg = await bot.channels.cache.get('847605635449094174').send(embed)
    }
})
	
// THIS IS THE bot.login

bot.login(process.env.token);
