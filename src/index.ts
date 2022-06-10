import dotenv from 'dotenv';
import { DiscordRegistrator } from './classes';
import { sleep } from './utils';
import readline from 'readline-sync';


// Loading environment variables
/**
 * HOTMAIL_BOX -> Hotmailbox API key
 */
dotenv.config();

/**
 * This is the main function
 * @author Raskolnkikov
 */
async function main() {
   // Reading user input
   let attempts = 0;
   do {
      attempts = readline.questionInt('How many accounts you wanna try to do? ');
   } while(attempts < 1);
   
   console.log(`Starting to create ${attempts} accounts!`)
   let success = 0, failed = 0, remaining = attempts;
   while (remaining !== -1) {
      const registrator = new DiscordRegistrator();
      const newAccount = await registrator.start();

      newAccount ? success++ : failed++;
      remaining--;

      process.title = `SUCCESS: ${success} - FAILED: ${failed} - REMAINING: ${remaining}`;
      await sleep(500);
   }
}

//! Running main function to start program
main()
   .then(() => console.log('All done.'));