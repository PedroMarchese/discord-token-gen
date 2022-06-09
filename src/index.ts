import dotenv from 'dotenv';
import { DiscordRegistrator } from './classes';
import { readInput, sleep } from './utils'

// Loading enviroment variables
dotenv.config();

/**
 * This is the main function
 * @author Raskolnkikov
 */
async function main() {
   let attempts = 0;
   do {
      parseInt(await readInput('How many accounts you wanna try to do?'));
   } while(attempts < 1 || isNaN(attempts));
   
   let success = 0, failed = 0, remaining = attempts;
   while (remaining !== -1) {
      const registrator = new DiscordRegistrator();
      const newAccount = await registrator.start();

      remaining--;
      if (newAccount)
         success++;
      else
         failed++;

      process.title = `SUCCESS: ${success} - FAILED: ${failed} - REMAINING: ${remaining}`;
      await sleep(500);
   }
}

//! Running main function to start program
main()
   .then(() => console.log('All done.'));