import fs from 'fs';

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

   public randomEmail(): string {
      return '';
   }

   public randomBirth(): string {
      return ''
   }
}