import axios, { AxiosRequestTransformer } from 'axios';
import { getFingerprint, commonHeaders } from '../utils';
import { CaptchaBypasser, AccountInfoGen, EmailManager } from '.';

/**
 * This class has the job of create accounts integrating all generator functions
 * @author Raskolnkikov
 */
export default class DiscordRegistrator {
   infoGen: AccountInfoGen;
   mailManager: EmailManager;
   registerURL: string;

   constructor () {
      this.infoGen = new AccountInfoGen();
      this.mailManager = new EmailManager();
      this.registerURL = 'https://discord.com/api/v9/auth/register';
   }
   
   /**
    * 
    * @param username 
    * @param email 
    * @param password 
    * @param dateOfBirth 
    * @param fingerprint 
    * @param captchaKey 
    * @returns {object}
    */
   private getPayload(username: string, email: string, password: string, dateOfBirth: string, fingerprint: string, captchaKey?: string): object {
      return {
         captcha_key: captchaKey ? captchaKey : null,
         consent: true,
         date_of_birth: dateOfBirth,
         email: email,
         fingerprint: fingerprint,
         gift_code_sku_id: null,
         invite: null,
         password: password,
         promotional_email_opt_in: false,
         username: username
      }
   }

   public async start(): Promise<string | null> {
      // Gets random account info
      let username = this.infoGen.randomUser();
      let password = this.infoGen.randomPassword();
      let email = await this.infoGen.randomEmail();
      let dateOfBirth = this.infoGen.randomBirth();
      
      // Instancing req headers and payload
      let fingerprint = await getFingerprint();
      let payload = this.getPayload(username, email.Email, password, dateOfBirth, fingerprint);
      let headers = commonHeaders(fingerprint);
      
      console.log(`Registering Account ${email}:${password}`);

      // Try to register without captcha
      let res = await axios.post(this.registerURL, payload, { headers: headers});

      // If captcha required
      if (res.status === 400) {
         console.log('Solving Captcha...');

         const cb = new CaptchaBypasser();
         payload = this.getPayload(username, email.Email, password, dateOfBirth, fingerprint, cb.bypass());

         res = await axios.post(this.registerURL, payload, { headers: headers});
      }

      await res;
      const tokenReg = /[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g;
      let token = res.data.token;

      if (tokenReg.test(token)) {
         console.log('Well succeeded!');
         
         return `${email}:${password}:${token}`;
      } else {
         console.log('Failed at all :(');
         console.log(res);

         return null;
      }
   }
}