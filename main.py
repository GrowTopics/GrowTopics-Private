import discord
import os
from discord.ext.commands import Bot, when_mentioned_or


COGS = ['jishaku']


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
        
        for cog in COGS:
            self.load_extension(cog)

    def load_extension(self, name, *, package=None):
        try:
            super().load_extension(name, package=package)
            print(f"Loaded {name}")
        except Exception as e:
            print(f"Couldn't load {name} - {e}")
            
    def unload_extension(self, name, *, package=None):
        try:
            super().unload_extension(name, package=package)
            print(f"Unloaded {name}")
        except Exception as e:
            print(f"Couldn't unload {name} - {e}")
        

GrowTopicsPrivate().run(os.getenv("token"))
