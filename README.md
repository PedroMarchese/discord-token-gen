# Discord Token Generator
Open source discord token generator. Has lots of bugs and is a WIP so feel free to help the development process.

## Requirements
Python 3.X and NodeJS 16.X or newer
## Installation
There's a script inside package.json so you can just run or type the same commands inside it

```bash
npm run setup
```

## Usage
You need to setup the dotenv file putting the HotmailBox API key if you want to verify emails with hotmail addresses. Feel free to modify it or use any kind of tempmail. =]

## .ENV FILE
```env
HOTMAIL_BOX="API KEY HERE" # If you want to verify your accounts
DELAY="100"                # How much time to wait until the next account creation
```

## Needed Files
```
📁 discord-token-gen
└📁 files
⠀└📄 proxies.txt
⠀└📄 names.txt
```

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)