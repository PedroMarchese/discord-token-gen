import axios, { AxiosRequestTransformer } from 'axios';
import { getFingerprint, commonHeaders } from '../../utils';
import { CaptchaBypasser, AccountInfoGen } from '../../classes';

export default class DiscordRegister {
   infoGen: AccountInfoGen;
   registerURL: string;

   constructor () {
      this.infoGen = new AccountInfoGen();
      this.registerURL = 'https://discord.com/api/v9/auth/register';
   }
   
   getPayload(username: string, email: string, password: string, dateOfBirth: string, fingerprint: string, captchaKey?: string): object {
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

   async register() {
      // Getting random account info
      let username = this.infoGen.randomUser();
      let password = this.infoGen.randomPassword();
      let email = this.infoGen.randomEmail();
      let dateOfBirth = this.infoGen.randomBirth();
      let fingerprint = await getFingerprint();
      let captchaKey: string;
      let payload = this.getPayload(username, email, password, dateOfBirth, fingerprint);
      let headers = commonHeaders(fingerprint);
      
      let res = await axios.post(this.registerURL, payload, { headers: headers});

      // If captcha required
      if (res.status === 400) {
         console.log('Captcha required');

         const cb = new CaptchaBypasser();
         payload = this.getPayload(username, email, password, dateOfBirth, fingerprint, cb.bypass());

         res = await axios.post(this.registerURL, payload, { headers: headers});
         if (res.status === 400)
            console.log(JSON.stringify(res));
      }

      let userJSON = res.data;
   }

   async registerBypass(payload: object, config: object) {
      let res = await axios.post(this.registerURL, payload, config);
   }
}