import dotenv from 'dotenv';
import { DiscordRegistrator } from './classes';
import { readInput, sleep } from './utils'

// Loading enviroment variables
dotenv.config({
   path: '../.env'
});

async function main() {
   const attempts = parseInt(readInput('How many accounts you wanna try to do?'));
   
   let success = 0;
   let failed = 0;
   let remaining = 0;

   for (let i=0; i<attempts; i++) {
      const registrator = new DiscordRegistrator();
      const newAccount = await registrator.start();

      if (newAccount === 'failed') {
         // FAILED MF
      } else {
         // Success
      }

      await sleep(500);
   }
}

main();