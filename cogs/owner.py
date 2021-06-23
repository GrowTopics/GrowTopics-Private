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
        e = discord.Embed(title=f"{ctx.author.name} has sent you a message!", description=msg, color=discord.Color(0x14242C))
        e.set_thumbnail(url=ctx.author.avatar_url)
        e.set_footer(text=f"User ID: {ctx.author.id}")
        await user.send(embed=e)
        await ctx.reply(f"📫 Sent to {user.mention}.")
    