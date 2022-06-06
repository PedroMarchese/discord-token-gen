from hcapbypass import bypass
import sys

captcha_solved = bypass(process.env.DISCORD_SITEKEY, 'discord.com', sys.argv[1], True)
print(captcha_solved)