import discord
import os
from discord.ext.commands import Bot, when_mentioned_or


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
        

GrowTopicsPrivate().run(os.getenv("token"))
