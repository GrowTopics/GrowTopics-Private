import discord
from discord.ext import commands
from discord.ext.commands import Cog, command


def setup(bot):
    bot.add_cog(Owner(bot))


class Owner(Cog):
    def __init__(self, bot):
        self.bot = bot

    async def cog_check(self, ctx):
        return await self.bot.is_owner(ctx.author)
    
    @command("dm")
    async def _dm(self, ctx, user: discord.User, *, msg):
        if ctx.author.permissions_in(ctx.channel).manage_messages:
            if content == None:
                await ctx.send("No Message Content Given!!!")
                await ctx.send("Command Format should be: `=dm <user_identifier> <message>` ",delete_after=5)
                return
            try:
                e = discord.Embed(title=f"{ctx.author.name} has sent you a message!", description=msg, color=discord.Color(0x14242C))
                e.set_thumbnail(url=ctx.author.avatar_url)
                e.set_footer(text=f"User ID: {ctx.author.id}")
                await user.send(embed=e)
                await ctx.reply(f"📫 **Direct Message** has been sent to {user.name}.")
            except Exception as err:
                await ctx.send(f"An Error Occured while sending a DM:\n{err}")
        else:
            await ctx.send("Only staff members can use this command.")

    @_dm.error
    async def invalid_usererror(ctx, err:commands.CommandError):
        if isinstance(err, commands.BadArgument):
            return await ctx.send('Invalid User Identifier or user could not be found')
