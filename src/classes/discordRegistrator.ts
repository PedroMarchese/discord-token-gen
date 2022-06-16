import axios, {
   AxiosRequestConfig,
   HeadersDefaults,
   AxiosInstance,
   AxiosRequestHeaders,
   AxiosProxyConfig
} from 'axios';
import { getFingerprint, commonHeaders, commonHeadersWithFingerprint } from '../utils';
import { EmailI, ProxyI } from '../interfaces'
import {
   CaptchaSolver,
   AccountInfoGen,
   EmailManager,
   ProxyManager,
   logger
} from '.';
import httpsAgent from 'https-proxy-agent';
import url from 'url';

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
   proxy: ProxyI;
   agent: httpsAgent.HttpsProxyAgent;

   constructor () {
      // Instancing managers
      this.infoGen = new AccountInfoGen();
      this.mailManager = new EmailManager();
      this.proxyManager = new ProxyManager();
      this.proxy = this.proxyManager.randomProxy;
      this.agent = new httpsAgent.HttpsProxyAgent(`${this.proxy.user}:${this.proxy.password}@zproxy.lum-superproxy.io:22225`);
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
      let fingerprint = await getFingerprint();
      let payload = this.getPayload(username, email.Email, password, dateOfBirth, fingerprint);

      this.axios.defaults.headers = {} as HeadersDefaults;
      const headers = commonHeaders();

      logger.log('info', `Registering Account ${email.Email}:${password}`);

      let requireCaptcha = false;
      let token = '';
      // Try to register without captcha
      await axios.post(this.registerURL, payload, {
         headers: (await commonHeadersWithFingerprint() as AxiosRequestHeaders),
         proxy: false,
         httpsAgent: useProxy ? this.agent : undefined
      })
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

         const cb = new CaptchaSolver();
         const captchaKey = await cb.solveCaptcha();
         logger.log('info', captchaKey.slice(0, 30));

         payload = this.getPayload(username, email.Email, password, dateOfBirth, fingerprint, captchaKey);
         fingerprint = await getFingerprint();

         await axios.post(this.registerURL, payload, { 
            headers: (await commonHeadersWithFingerprint() as AxiosRequestHeaders),
            proxy: false,
            httpsAgent: useProxy ? this.agent : undefined
         })
            .then(res => token = res.data.token)
            .catch(err => console.log(err.message))
      }

      const tokenReg = /[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g;

      logger.log('info', `New Token: ${token}`);

      if (tokenReg.test(token)) {
         logger.log('info', 'Well succeeded!');
         
         return `${email.Email}:${password}:${token}`;
      } else {
         logger.log('info', 'Failed at all :(');
         
         return null;
      }
   }
}