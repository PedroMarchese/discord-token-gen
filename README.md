# Discord Token Generator
Open source discord token generator. Has lots of bugs and is a WIP so feel free to help the development process.

# Need To Implement
proxies
GUI

## Requirements
NodeJS 16.X or newer

## Installation
There's a script inside package.json so you can just run or type the same commands inside it

```bash
npm run setup
```

## Usage
You need to setup the dotenv file putting the HotmailBox API key if you want to verify emails with hotmail addresses. Feel free to modify it or use any kind of tempmail. =]

## .ENV FILE
```env
CAPTCHA_API="2CAPTCHA API KEY HERE" # Must have that api
HOTMAIL_BOX="API KEY HERE" # If you want to verify your accounts
DISCORD_URL="https://discord.com/register" # Discord url register link
DISCORD_KEY="4c672d35-0701-42b2-88c3-78380b0db560" # Discord hcaptcha key
DELAY="100"                # How much time to wait until the next account creation
```

## Needed Files
```
📁 discord-token-gen
└📁 files
⠀└📄 proxies.txt
⠀└📄 names.txt
⠀└📄 accounts.txt
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[No-License](https://choosealicense.com/licenses/no-license/)