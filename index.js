const Discord = require('discord.js'); 
const bot = new Discord.Client();

const prefix = "="

// THIS IS THE STATUS

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag} :)`);
    
    bot.channels.cache.get('847602473627025448').send(`I have restarted!`)
    bot.channels.cache.get('848662008030953482').send(`No errors, I have restarted!`)
    
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
            const content = args.join(' ').replace(`<@!${userID}> `, '')

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

//announce command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "announce") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`New Announcement`);
            embed.setDescription(`${content}`);
	    embed.setFooter(`Announced by ${message.author.id}`)

            member.send(embed);
		
	    const order = bot.channels.cache.get('848656240678666282')
	    
	    order.send(`<@${userID}>, your announcement has been completed.`)

            message.channel.send(`@everyone`)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//partner Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "partner") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`Partnership`);
            embed.setDescription(`Welcome to the GrowTopics partnership program. Your partner message has been posted in <#843868567551344670> and you have been given the @Partner role on the official server. Thanks for partnering with GrowTopics!`);
	    embed.setFooter(`You can DM this bot if you have any questions, comments or concerns.`)
		
            member.send(embed);
	    member.roles.add('843211687708721222');

            message.channel.send(`You have officially partnered <@${userID}>.`)
		
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//force verify Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "force") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`Force Verify`);
            embed.setDescription(`<@${message.author.id}> has brought a wrath apon you. You have to re-verify in the GrowTopics server, starting in <#847988655216918558>!`);
	    embed.setFooter(`You can DM this bot if you have any questions, comments or concerns.`)
		
            member.send(embed);
	    
		//member role
	    member.roles.remove('847989361781637130');
		//Add In Step 1
	    member.roles.add('848321858504097792');
		//gender
	    member.roles.remove('847989146484211712');
	    member.roles.remove('847989195490459678');
	    member.roles.remove('847989226155016212');
		//verified roles
	    member.roles.remove('848316110797013034');
	    member.roles.remove('848316243488407626');
	    member.roles.remove('848316763228864543');
	    member.roles.remove('848317411823845408');
	    member.roles.remove('848317448943173633');
	    member.roles.remove('848316508866478110');
		//verifying roles
	    member.roles.remove('848318293601157161');
	    member.roles.remove('848318326858055731');
	    member.roles.remove('848318342086393886');
	    member.roles.remove('848318352342122526');
	    member.roles.remove('848318363141799986');
	    member.roles.remove('848318379051974667');
	    member.roles.remove('848321902376386560');

            message.channel.send(`You have un-verified <@${userID}>.`)
		
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//Complete-order Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "complete-order") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`Order Complete!`);
            embed.setDescription(`Your order (\`\`${content}\`\`) has been completed by <@${message.author.id}>`);

            member.send(embed);
		
	    const order = bot.channels.cache.get('848209098238722130')
	    
	    order.send(`<@${userID}>, your order (\`\`${content}\`\`) has been completed by <@${message.author.id}>`)

            message.channel.send(`Your order \`\`${content}\`\` has been marked as completed!`)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//take-order Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "take-order") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`Order Started!`);
            embed.setDescription(`Your order (\`\`${content}\`\`) has been taken by <@${message.author.id}>`);

            member.send(embed);
		
	    const order = bot.channels.cache.get('848209098238722130')
	    
	    order.send(`<@${userID}>, your order (\`\`${content}\`\`) has been taken by <@${message.author.id}>`)

            message.channel.send(`Your order \`\`${content}\`\` has been marked as taken!`)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//create-order Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "create-order") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`Order Created!`);
            embed.setDescription(`Your order (\`\`${content}\`\`) has been created by <@${message.author.id}>`);

            member.send(embed);
		
	    const order = bot.channels.cache.get('848209098238722130')
	    
	    order.send(`<@${userID}>, Your order (\`\`${content}\`\`) has been created by <@${message.author.id}>`)

            message.channel.send(`Your order \`\`${content}\`\` has been created!`)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//accept-order Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "accept-order") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');
		
            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`Order Accepted!`);
            embed.setDescription(`Your order \`\`\`${content}\`\`\` has been accepted by <@${message.author.id}>`);
	    embed.setFooter(`Keep in mind that this doesn't mean your order is in progress, it just means we have listed your order for workers.`)

            member.send(embed);

            message.channel.send(`Your order \`\`\`${content}\`\`\` has been marked as accepted!`)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//add-money Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "add-money") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`Money Added!`);
            embed.setDescription(`You now have (\`\`${content} WLs\`\`) in GrowTopics Pay, edited by <@${message.author.id}>`);

            member.send(embed);
		
	    const order = bot.channels.cache.get('848300313232408606')
	    
	    order.send(`<@${userID}>, you now have (\`\`${content} WLs\`\`) in GrowTopics Pay, edited by <@${message.author.id}>`)

            message.channel.send(`You have updated <@${userID}>'s WLs to \`\`${content}\`\``)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//remove-money Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "remove-money") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`Money Removed!`);
            embed.setDescription(`You now have (\`\`${content} WLs\`\`) in GrowTopics Pay, edited by <@${message.author.id}>`);

            member.send(embed);
		
	    const order = bot.channels.cache.get('848300313232408606')
	    
	    order.send(`<@${userID}>, you now have (\`\`${content} WLs\`\`) in GrowTopics Pay, edited by <@${message.author.id}>`)

            message.channel.send(`You have updated <@${userID}>'s WLs to \`\`${content}\`\``)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//add-cb Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "add-cb") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`CB Added!`);
            embed.setDescription(`You now have (\`\`${content} CB\`\`), edited by <@${message.author.id}>`);

            member.send(embed);
		
	    const order = bot.channels.cache.get('848300683915821116')
	    
	    order.send(`<@${userID}>, You now have (\`\`${content} CB\`\`), edited by <@${message.author.id}>`)

            message.channel.send(`You have updated <@${userID}>'s CB to \`\`${content}\`\``)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//remove-cb Command
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "remove-cb") {
        if (message.author.bot) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Only staff members can use this command.`);
        if (message.content.indexOf(prefix) !== 0) return;
        try {
            let userID = (args[0] || message.author.id).toString();

            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            const content = args.join(' ').replace(`<@!${userID}> `, '')

            if (!member) return message.channel.send('Unable to find that user');

            const embed = new Discord.MessageEmbed()
            embed.setColor('14242c');
            embed.setTitle(`CB Removed!`);
            embed.setDescription(`You now have (\`\`${content} CB\`\`), edited by <@${message.author.id}>`);

            member.send(embed);
		
	    const order = bot.channels.cache.get('848300683915821116')
	    
	    order.send(`<@${userID}>, You now have (\`\`${content} CB\`\`), edited by <@${message.author.id}>`)

            message.channel.send(`You have updated <@${userID}>'s CB to \`\`${content}\`\``)
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

//private order Inbox
bot.on('message', async message => {
    if (message.content === "=private-order") {
        const exampleEmbed = new Discord.MessageEmbed()
            .setTitle('How to use this channel!')
            .setDescription('To place an order, please put the following information in to one message in the proper order:\n```GrowID:\nService:\nWorld:\nPassword Door password:\nClear Cave Background:\nNotes:\nReward (in WLs):```')

        message.channel.send(exampleEmbed);
    }

if (message.author.id === '845461877433696266') return
    if (message.channel.id == '848378692156522557' || !message.guild) {
        const embed = new Discord.MessageEmbed()
        const guild = bot.guilds.cache.get('842213244297936918');

        embed.setColor('14242c');
        embed.setTitle(`${message.author.tag} sent us a private order!`);
        embed.setDescription(`<@${message.author.id}> \n ${message.content}`);
        embed.setFooter('User ID: ' + message.author.id);

        const msg = await bot.channels.cache.get('848378734993866753').send(embed)
        msg.react('❌');
        if (message.guild) message.delete();
    }
})

//Private order Reactions
bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.channel.id === '848378734993866753') {
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
	    if (message.channel.id === '845456151495311390') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Scams')
            .setDescription('Drop Games : <:DropGame:846103300214095883>\nTrust Games : <:TrustGame:846103514508951563>\nWorld Trade With Floating Items : <:WorldTradeWithFloatingItems:846167025565958154>')
	const msg = await bot.channels.cache.get('845456151495311390').send(embed)
        msg.react('846103300214095883');
	msg.react('846103514508951563');
	msg.react('846167025565958154');
	}
    }
})

//Channel #🔓next-cup command
bot.on('message', async message => {
    if (message.content === "=channel <#847605635449094174>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '847605635449094174') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Next Cup')
            .setDescription('This is the place where people level up their work status (moving to the next cup level). Here is a list of staff roles.\n\n```Roles:```\n<@&842217030911262741>\n<@&847606980596334623>\n<@&842216986565541899>\n<@&847605026184364052>\n<@&847603055972974633>\n\nFor a list of what each role does, go to <#847606515207766089>!\n\n```Cups:```\n<@&843328528597647392>\n<@&843328508541140992>\n<@&843328486982156288>\n<@&843328466232410114>\n<@&843328448151158784>\n<@&843328427864227871>\n<@&843328406674210846>\n<@&843328254941331496>\n<@&843328165475778560>\n<@&843328090608631828>\n\nIf the staff level up to another cup, they will be able to see the level up message here. If you end up leaving the discord server and joining back, your staff role(s) will disappear, but your cup role(s) will not.')
	const msg = await bot.channels.cache.get('847605635449094174').send(embed)
	}
    }
})

//Channel #staff-positions (positions) command
bot.on('message', async message => {
    if (message.content === "=channel <#847606515207766089> positions") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '847606515207766089') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Staff Positions')
            .setDescription('```Owner:```\nThese are the owner(s) of GrowTopics.\n\n```Administrator:```\nAdministrators have access to everything and they can overrule the rest of the staff. They are hand picked and there is no asking to become one.\n\n```Staff:```\nStaff members complete orders and do some simple jobs for CB.\n\n```Apprentice:```\nBeing an apprentice means you can officially earn the @Cup 1 (100 CB) and up roles. You are still a student, so that means that nothing changes, but the fact that you can now "Cupgrade". You officially become staff when you get to @Cup 2 (200 CB).\n\n```Student:```\nStudents have the ability to do things like report casinos and illegal games and other small tasks, but they cannot fill orders for WLs, you need to upgrade to staff. To level up to apprentice, all you have to do is get 50 CB.')
	const msg = await bot.channels.cache.get('847606515207766089').send(embed)
	}
    }
})

//Channel #staff-positions (leveling) command
bot.on('message', async message => {
    if (message.content === "=channel <#847606515207766089> leveling") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '847606515207766089') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Staff Leveling')
            .setDescription('Every staff member has a level that they can level up with. But the way that it works is a little funky. Every person has a coffee cup with 0 coffee beans and over time, as you do things, you can get coffee beans and you will need to get a certain amount of coffee beans to get a full cup of coffee. The next level will need double the amount of the last level. Here are the roles:\n<@&843328528597647392>\n<@&843328508541140992>\n<@&843328486982156288>\n<@&843328466232410114>\n<@&843328448151158784>\n<@&843328427864227871>\n<@&843328406674210846>\n<@&843328254941331496>\n<@&843328165475778560>\n<@&843328090608631828>\nEach role shows how much coffee beans (CB) you need to level up to the next level.')
	const msg = await bot.channels.cache.get('847606515207766089').send(embed)
	}
    }
})

//Channel #staff-positions (staff apps) command
bot.on('message', async message => {
    if (message.content === "=channel <#847606515207766089> apps") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '847606515207766089') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Staff Positions')
            .setDescription('```Student:```\nStudents have the ability to do things like report casinos and illegal games and other small tasks, but they cannot fill orders for WLs, you need to upgrade to staff. To level up to apprentice, all you have to do is get 50 CB.')
	const msg = await bot.channels.cache.get('847606515207766089').send(embed)
	}
    }
})

//Channel #staff command
bot.on('message', async message => {
    if (message.content === "=channel <#847842532545134612>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '847842532545134612') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Staff')
            .setDescription('For a list of staff positions, go to #staff-positions!\n```This is the place where people can see their staff upgrade status. For example, if you become a student, then you would get a message that looks like this: @User has become a Student to the staff program!```')
	const msg = await bot.channels.cache.get('847842532545134612').send(embed)
	}
    }
})

//Channel #partners (GrowLancer) command
bot.on('message', async message => {
    if (message.content === "=channel <#843868567551344670> growlancer") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '843868567551344670') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('GrowLancer')
            .setDescription('Looking for freelancers to spice up your Growtopia experience?\nIntroducing... **GrowLancer**\n\n**GrowLancer **is a service provider platform (heavily inspired from **Growrr**) combining different services and helping them reach more clients!\n**GrowLancer **is powered by **GS Pay**, making purchases **100% scam-free**!\n\nJoin our **Discord server** to suggest and keep updated of our doings.')
	const msg = await bot.channels.cache.get('843868567551344670').send(embed)
	message.channel.send('https://discord.gg/mSyD3mxeFU');
	}
    }
})

//Channel #partners (Block Corp) command
bot.on('message', async message => {
    if (message.content === "=channel <#843868567551344670> blockcorp") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '843868567551344670') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Block Corporation')
            .setDescription('BlockCorp is a up and coming service provider company. We were established in 2018 by Bundestag and xWeird. Over the past year, we have separated from GrowStocks and become our own independent company. We have handled hundreds of orders, and did orders for many popular members of the Growtopia community. You can order at our website found below.\n\n**Website**: https://blockcorp.xyz')
	const msg = await bot.channels.cache.get('843868567551344670').send(embed)
	message.channel.send('https://discord.gg/egbuKHu3mm');
	}
    }
})

// CUP UPGRADES ------------------------------

bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const tdc = bot.guilds.cache.get('842213244297936918');
    if (command === "cupgrade") {
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;
        if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
        try {
            let userID = (args[0]);
            userID = userID.replace(/[^0-9]/g, '');

            const member = tdc.members.cache.get(userID);
            if(!member) return message.channel.send('Unable to find that user.');

            let roles = ['843328528597647392', '843328508541140992', '843328486982156288', '843328466232410114', '843328448151158784', '843328427864227871', '843328406674210846', '843328254941331496', '843328165475778560', '843328090608631828'];
            let currentRole = member.roles.cache.filter(role => roles.includes(role.id.toString())).keyArray;
            currentRole = currentRole.length > 0 ? currentRole[currentRole.length - 1] : null;
            if (currentRole === roles[roles.length - 1]) return await message.channel.send("User is already at max cup role.")

            let role = roles[0];
            if (currentRole !== null) role = roles[roles.indexOf(currentRole) + 1];
            role = tdc.roles.cache.get(role);

            await member.roles.add(role);
            if (currentRole !== null) await member.roles.remove(currentRole);

            await message.channel.send(`<@${userID}> has leveled up to <@&${role.id}>!`)
        } catch (e) {
            message.channel.send(e.toString());
        }
    }
})

//Cup 1
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade1") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328528597647392');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328528597647392>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

//Cup 2
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade2") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328508541140992');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328508541140992>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

//Cup 3
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade3") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328486982156288');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328486982156288>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

//Cup 4
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade4") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328466232410114');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328466232410114>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

//Cup 5
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade5") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328448151158784');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328448151158784>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

//Cup 6
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade6") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328427864227871');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328427864227871>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

//Cup 7
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade7") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328406674210846');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328406674210846>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

//Cup 8
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade8") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328254941331496');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328254941331496>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

//Cup 9
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade9") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328165475778560');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328165475778560>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

//Cup 10
bot.on('message', async message => {
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();
     const tdc = bot.guilds.cache.get('842213244297936918');
     if (command === "cupgrade10") {
	     message.delete().catch(O_o => { });
         if (message.author.bot) return;
         if (!message.member.roles.cache.has('847606980596334623')) return message.channel.send(`Hello there, it seams that you don't have the permission to cupgrade someone. Please wait for an admin and delete this message.`);
         if (message.content.indexOf(prefix) !== 0) return;
         try {
             let userID = (args[0]);

             userID = userID.replace(/[^0-9]/g, '');
             const member = tdc.members.cache.get(userID);

             if (!member) return message.channel.send('Unable to find that user');
        
             await member.roles.add('843328090608631828');

             await message.channel.send(`<@${userID}> has leveled up to <@&843328090608631828>!`)
         } catch (e) {
             message.channel.send(e.toString());
         }
     }
 })

// Reaction Roles ------------------------------

//Gender Roles
bot.on('message', async message => {
    if (message.content === "=channel <#847988655216918558>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '847988655216918558') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Gender Roles')
            .setDescription('♂ <@&847989146484211712>\n♀️ <@&847989195490459678>\n🤘 <@&847989226155016212>')
	    .setFooter('This is NOT changable after you react!')
	const msg = await bot.channels.cache.get('847988655216918558').send(embed)
	}
    }
})
	
//Attach Files Roles
bot.on('message', async message => {
    if (message.content === "=channel <#848312438725804042>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '848312438725804042') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Attach Files')
            .setDescription('By reacting below, you agree that we can remove your verification at any time for using innapropriate content under this verification.\n\nDo you agree with the above?\n✅ will give <@&848316110797013034>')
	    .setFooter('This is mandatory to continue!')
	const msg = await bot.channels.cache.get('848312438725804042').send(embed)
	}
    }
})

//Embed Links Roles
bot.on('message', async message => {
    if (message.content === "=channel <#848318076898639913>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '848318076898639913') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Embed Links')
            .setDescription('By reacting below, you agree that we can remove your verification at any time for using innapropriate content under this verification.\n\nDo you agree with the above?\n✅ will give <@&848316243488407626>')
	    .setFooter('This is mandatory to continue!')
	const msg = await bot.channels.cache.get('848318076898639913').send(embed)
	}
    }
})
	    
//External Emojis Roles
bot.on('message', async message => {
    if (message.content === "=channel <#848318111157583953>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '848318111157583953') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('External Emojis')
            .setDescription('By reacting below, you agree that we can remove your verification at any time for using innapropriate content under this verification.\n\nDo you agree with the above?\n✅ will give <@&848316763228864543>')
	    .setFooter('This is mandatory to continue!')
	const msg = await bot.channels.cache.get('848318111157583953').send(embed)
	}
    }
})

//VC Speak Roles
bot.on('message', async message => {
    if (message.content === "=channel <#848318126151303168>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '848318126151303168') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('VC Speak')
            .setDescription('By reacting below, you agree that we can remove your verification at any time for using innapropriate content under this verification.\n\nDo you agree with the above?\n✅ will give <@&848317411823845408>')
	    .setFooter('This is mandatory to continue!')
	const msg = await bot.channels.cache.get('848318126151303168').send(embed)
	}
    }
})

//VC Video Roles
bot.on('message', async message => {
    if (message.content === "=channel <#848318148943806494>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '848318148943806494') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('VC Video')
            .setDescription('By reacting below, you agree that we can remove your verification at any time for using innapropriate content under this verification.\n\nDo you agree with the above?\n✅ will give <@&848317448943173633>')
	    .setFooter('This is mandatory to continue!')
	const msg = await bot.channels.cache.get('848318148943806494').send(embed)
	}
    }
})

//Reactions Roles
bot.on('message', async message => {
    if (message.content === "=channel <#848318187362582559>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '848318187362582559') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Reactions')
            .setDescription('By reacting below, you agree that we can remove your verification at any time for using innapropriate content under this verification.\n\nDo you agree with the above?\n✅ will give <@&848316508866478110>')
	    .setFooter('This is mandatory to continue!')
	const msg = await bot.channels.cache.get('848318187362582559').send(embed)
	}
    }
})
	    
//member Role
bot.on('message', async message => {
    if (message.content === "=channel <#848322985807052851>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '848322985807052851') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Member')
            .setDescription('By reacting below, you agree that we can remove your verification at any time for being innapropriate.\n\nDo you agree with the above?\n✅ will give <@&847989361781637130>')
	    .setFooter('This is mandatory to continue and the last step to verifying!')
	const msg = await bot.channels.cache.get('848322985807052851').send(embed)
	}
    }
})

//#read
bot.on('message', async message => {
    if (message.content === "=channel <#848365067691229215>") {
	    message.delete().catch(O_o => { });
	    if (message.channel.id === '848365067691229215') {
        const embed = new Discord.MessageEmbed()
            .setColor('14242c')
            .setTitle('Close Verification')
            .setDescription('React with ✅ to close verification!')
	const msg = await bot.channels.cache.get('848365067691229215').send(embed)
	}
    }
})
	
// THIS IS THE bot.login

bot.login(process.env.token);
