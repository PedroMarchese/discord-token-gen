import dotenv from 'dotenv';
import { DiscordRegistrator, logger } from './classes';
import { sleep } from './utils';
import readline from 'readline-sync';
import fs from 'fs';
import path from 'path';

// Loading environment variables
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
   let success = 0, failed = 0, remaining = attempts;
   for (;;) {
      const registrator = new DiscordRegistrator();
      const newAccount = await registrator.start(useProxy).catch(async err => {
         logger.log('info', '-'.repeat(20));
         logger.log('info', err.message);
         logger.log('info', 'Waiting for rating limit...');
         await sleep(3 * parseInt(process.env.DELAY!));
      });

      if (!newAccount) {
         await sleep(2 * 60 * 1000);
         continue;
      }

      // Incrementing and decrementing
      newAccount ? success++ : failed++; remaining--;

      // Account created
      logger.log('info', `Nova conta criada: ${newAccount}`);
      fs.appendFileSync(path.join(process.cwd(), 'files', 'accounts.txt'), `${newAccount!}\n`, { encoding: 'utf-8' });

      // Changes process title
      process.title = `SUCCESS: ${success} - FAILED: ${failed} - REMAINING: ${remaining}`;

      // Check if should end loop
      if (remaining === 0)
         break;

      // Random sleep between a range if not proxy
      if (useProxy)
         await sleep(100);
      else {
         logger.log('info', 'Waiting for rating limit...');
         await sleep(3 * parseInt(process.env.DELAY!));
      }

   }

   logger.log('info', 'Finalizado o bot!');
}

//! Running main function to start program
main()