import captchaSolver from '2captcha-node';
import axios from 'axios';
import { ProxyI } from '../interfaces';
import { sleep } from '../utils';

type HCaptchaToken = string;

export default class CaptchaSolver {
   key: string;
   discordURL: string;

   constructor() {
      this.key = '4c672d35-0701-42b2-88c3-78380b0db560';
      this.discordURL = 'http://discord.com/register';
   }

   async getCaptchaID(): Promise<string> {
      let res = await axios.get(
         `http://2captcha.com/in.php?key=${process.env.CAPTCHA_API_KEY}&json=1&method=hcaptcha&pageurl=${this.discordURL}&sitekey=${this.key}`
      );
   
      return res.data.request;
   }  
   
   async solveCaptcha(): Promise<HCaptchaToken> {
      return new Promise(async (resolve, reject) => {
         await axios.get(`http://2captcha.com/in.php?key=${process.env.CAPTCHA_API_KEY}&json=1&method=hcaptcha&pageurl=${this.discordURL}&sitekey=${this.key}`)
            .then(async res => {
               const id = res.data.request;

               // Just because i don't want to write "while(true) {}"
               for (;;) {
                  await axios.get(`https://2captcha.com/res.php?key=${process.env.CAPTCHA_API_KEY}&action=get&id=${id}&json=1`)
                     .then(async r => {
                        let { status, request } = res.data;

                        // CAPTHA SOLVED
                        if (request == 'CAPCHA_NOT_READY') {
                           console.log('não resolvido ainda');
                           await sleep(10000);
                        } else if (status === 0 && request !== 'CAPCHA_NOT_READY') {
                           return reject(`${status} - ${request}`);
                        } else
                           return resolve(request);   
                     });
               }               
            })
            .catch(err => console.log(err));
      });
   }
}