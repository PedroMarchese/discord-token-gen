import fs from 'fs';
import axios from 'axios';
import { EmailI } from '../interfaces';
import EmailManager from '../classes/emailManager';

/**
 * This is a class to generate random account info
 * @author Raskolnkikov
 */
class AccountInfoGen {
   /**
    * This function generates a random username based on files/names.txt file
    * @author Raskolnkikov
    * @return {string}
    */
   public randomUser(): string {
      const nameList = fs.readFileSync('../../../files/names.txt', { encoding: 'utf-8' })
         .split('\n')
         .map(n => n.trim());

      return nameList[Math.floor(Math.random() * nameList.length)];
   }

   /**
    * This function generates a random password converting a random number to string and slicing [2:28] using radix 
    * @author Raskolnkikov
    * @return {string}
    */
   public randomPassword(): string {
      return Math.random().toString(36).slice(2, 28);
   }

   /**
    * This function returns a new email from hotmailbox
    * @author Raskolnkikov
    * @return {EmailI}
    */
   public async randomEmail(): Promise<EmailI> {
      const emailManager = new EmailManager();
      const newEmail = await emailManager.buyOne();

      if (newEmail)
         return newEmail;
      else
         throw new Error('You don\'t have enough balance');
   }

   /**
    * This function returns a random birth date
    * @author Raskolnkikov
    * @return {string}
    */
   private randomDate(start: Date, end: Date): Date {
      const startTime = start.getTime();
      const endTime = end.getTime();

      return new Date(startTime + Math.random() *  (endTime - startTime));
   }

   /**
    * This function returns a random birth date
    * @author Raskolnkikov
    * @return {string}
    */
   public randomBirth(): string {
      return this.randomDate(new Date('1995-02-12'), new Date('2001-02-12')).toLocaleDateString('en-US');
   }
}

export default AccountInfoGen;