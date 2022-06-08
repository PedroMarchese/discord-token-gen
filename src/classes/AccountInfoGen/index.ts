import fs from 'fs';
import axios from 'axios';

export default class AccountInfoGen {
   constructor() {
   }

   public randomUser(): string {
      const nameList = fs.readFileSync('../../../files/names.txt', { encoding: 'utf-8' })
         .split('\n')
         .map(n => n.trim());

      return nameList[Math.floor(Math.random() * nameList.length)];
   }

   public randomPassword(): string {
      return Math.random().toString(36).slice(2, 28);
   }

   public async randomEmail(email: string, password: string): Promise<string> {
      const verificationLink = await axios.get(`https://getcode.hotmailbox.me/discord?email=${email}&password=${password}&timeout=30`, {
         timeout: 3000
      });
      

      return '';
   }

   public randomBirth(): string {
      return '';
   }
}