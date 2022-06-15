import dotenv from 'dotenv';
import { DiscordRegistrator, logger } from './classes';
import { sleep } from './utils';
import readline from 'readline-sync';
import fs from 'fs';
import path from 'path';

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
   
   // Ask if proxies
   const useProxy = readline.keyInYN('Wanna use proxy?');
   
   // Account creation loop starts
   logger.log('info', `Starting to create ${attempts} accounts!`);
   // console.log(`Starting to create ${attempts} accounts!`);
   let success = 0, failed = 0, remaining = attempts;
   while (remaining !== 0) {
      const registrator = new DiscordRegistrator();
      const newAccount = await registrator.start(useProxy);

      // Incrementing and decrementing
      newAccount ? success++ : failed++;
      remaining--;

      // Account created
      logger.log('info', `Nova conta criada: ${newAccount}`);
      fs.appendFileSync(path.join(process.cwd(), 'files', 'accounts.txt'), newAccount!, { encoding: 'utf-8' })
      process.title = `SUCCESS: ${success} - FAILED: ${failed} - REMAINING: ${remaining}`;
      // Random sleep between a range if not proxy
      useProxy ? await sleep(50) : await sleep(parseInt(process.env.DELAY!));
   }
}

//! Running main function to start program
main()
   .then(() => console.log('All done.'))
   .catch(err => console.log(err));