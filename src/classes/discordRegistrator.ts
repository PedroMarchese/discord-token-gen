import axios, { AxiosResponse, AxiosRequestConfig, AxiosError, HeadersDefaults, AxiosInstance } from 'axios';
import { getFingerprint, commonHeaders } from '../utils';
import { EmailI } from '../interfaces'
import {
   CaptchaBypasser,
   AccountInfoGen,
   EmailManager,
   ProxyManager
} from '.';

/**
 * This class has the job of create accounts integrating all generator functions
 * @author Raskolnkikov
 */
export default class DiscordRegistrator {
   infoGen: AccountInfoGen;
   mailManager: EmailManager;
   proxyManager: ProxyManager;
   registerURL: string;
   axios: AxiosInstance;

   constructor () {
      // Instancing managers
      this.infoGen = new AccountInfoGen();
      this.mailManager = new EmailManager();
      this.proxyManager = new ProxyManager();
      this.axios = axios.create();

      // Constants
      this.registerURL = 'https://discord.com/api/v9/auth/register';
   }
   
   private async getRandomAccountInfos(): Promise<{ username: string, password: string, email: EmailI, dateOfBirth: string }> {
      let username = this.infoGen.randomUser();
      let password = this.infoGen.randomPassword();
      let email = process.env.HOTMAIL_BOX ? await this.infoGen.randomEmail() : this.mailManager.getRandom();
      let dateOfBirth = this.infoGen.randomBirth();

      return { username: username, password: password, email: email, dateOfBirth: dateOfBirth }
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
   private getPayload(username: string, email: string, password: string, dateOfBirth: string, fingerprint: string, captchaKey=''): AxiosRequestConfig {
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
      } as AxiosRequestConfig;
   }

   public async start(useProxy: boolean | string): Promise<string | null> {
      // Gets random account info
      const { username, password, email, dateOfBirth } = await this.getRandomAccountInfos();
      console.log(`Account info generated ${username} | ${password} | ${email.Email} | ${dateOfBirth}!`);
      
      // Instancing req headers and payload
      const fingerprint = await getFingerprint();
      let payload = this.getPayload(username, email.Email, password, dateOfBirth, fingerprint);
      this.axios.defaults.headers = commonHeaders() as HeadersDefaults;

      console.log(`Registering Account ${email.Email}:${password}`);

      let requireCaptcha = false;
      let token = '';
      // Try to register without captcha
      await axios.post(this.registerURL, payload, { headers: { 'X-Fingerprint': fingerprint } })
         .then(res => {
            if (res.data.token)
               token = res.data.token;
         })
         .catch(err => {
            requireCaptcha = err.response.data.captcha_key[0] === 'captcha-required';
         });

      // NEEDS TO FIX THIS PART BELOW \/
      // If captcha required
      if (requireCaptcha) {
         console.log('Solving Captcha...');

         const cb = new CaptchaBypasser();
         const captchaKey = cb.bypass();
         console.log(captchaKey);
         payload = this.getPayload(username, email.Email, password, dateOfBirth, fingerprint, captchaKey);

         await axios.post(this.registerURL, payload, { headers: { 'X-Fingerprint': fingerprint } })
            .then(res => {
               token = res.data.token;
            })
            .catch(err => console.log(err.message));
      }

      const tokenReg = /[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g;

      // console.log(token)

      if (tokenReg.test(token)) {
         console.log('Well succeeded!');
         
         return `${email}:${password}:${token}`;
      } else {
         console.log('Failed at all :(');
         // console.log(res);

         return null;
      }
   }
}