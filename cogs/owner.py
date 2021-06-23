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
        await user.send(msg)
        await ctx.reply(f"📫 Sent to {user.mention}.")
    