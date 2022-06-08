from hcapbypass import bypass
import sys

captcha_solved = bypass('4c672d35-0701-42b2-88c3-78380b0db560', 'discord.com', sys.argv[1], True)
print(captcha_solved)