import logging
import discord
from discord import activity
from discord.ext.commands import Bot, when_mentioned_or

import os


logger = logging.getLogger('growtopics')
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
logger.addHandler(handler)

COGS = ['jishaku', 'cogs.owner']


def get_prefix(bot, message):
    return when_mentioned_or(*["="])(bot, message)


class GrowTopicsPrivate(Bot):
    def __init__(self):
        super().__init__(
            get_prefix,
            help_command=None,
            description="GrowTopics Private Bot",
            activity=discord.Game("loading..."),
            case_insensitive=True,
            intents=discord.Intents.all()
        )

        self.log = logger

        for cog in COGS:
            self.load_extension(cog)

    def load_extension(self, name, *, package=None):
        try:
            super().load_extension(name, package=package)
            self.log.info(f"Loaded {name}")
        except Exception as e:
            self.log.error(f"Couldn't load {name} - {e}")

    def unload_extension(self, name, *, package=None):
        try:
            super().unload_extension(name, package=package)
            self.log.info(f"Unloaded {name}")
        except Exception as e:
            self.log.error(f"Couldn't unload {name} - {e}")

    async def on_message(self, m):
        if m.author.bot:
            return
        ctx = await self.get_context(m)
        if ctx.valid:
            return await self.process_commands(m)

        # DM Listener
        if m.guild == None:
            content = m.content
            e = discord.Embed(
                title = f"{m.author.name} sent us a message!",
                description = f"From {m.author.mention}\n{content}",
                colour = discord.Colour(0x14242C)
            )
            e.set_thumbnail(url=m.author.avatar_url)
            e.set_footer(text=f"User ID: {m.author.id}")
            await self.get_channel(845476323005956116).send(embed=e)

            return
    async def on_ready(self):
        self.log.info("Ready!")
        await self.change_presence(activity=discord.Activity(name="www.growtopics.xyz", type=discord.ActivityType.watching))

    async def close(self):
        await super().close()
        self.log.info("Shutdown Complete.")

    def run(self):
        try:
            self.log.info("Starting...")
            super().run(os.getenv("token"), reconnect=True)
        except Exception as e:
            self.log.critical(f"Could not start - {e}")


GrowTopicsPrivate().run()
