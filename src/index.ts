import dotenv from 'dotenv';
import { DiscordRegistrator } from './classes';
import { readInput, sleep } from './utils'

// Loading enviroment variables
dotenv.config();

async function main() {
   const attempts = parseInt(await readInput('How many accounts you wanna try to do?'));
   
   let success = 0;
   let failed = 0;
   let remaining = attempts;

   while (remaining !== -1) {
      const registrator = new DiscordRegistrator();
      const newAccount = await registrator.start((attempts - remaining) + 1);

      if (newAccount === 'failed') {
         // FAILED MF
         failed++;
      } else {
         // Success
         success++;
      }

      remaining--;

      process.title = `SUCCESS: ${success} - FAILED: ${failed} - REMAINING: ${remaining}`;
      await sleep(500);
   }
}

main().then(() => {})