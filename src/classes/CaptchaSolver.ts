import captchaSolver from '2captcha-node';
import axios from 'axios';
import { ProxyI } from '../interfaces';
import { sleep } from '../utils';

type HCaptchaToken = string;

export default class CaptchaSolver {
   async getCaptchaID(): Promise<string> {
      const { CAPTCHA_API, DISCORD_URL, DISCORD_KEY } = process.env
      let res = await axios.get(
         `http://2captcha.com/in.php?key=${CAPTCHA_API}&json=1&method=hcaptcha&pageurl=${DISCORD_URL}&sitekey=${DISCORD_KEY}`
      );
   
      return res.data.request;
   }  
   
   async solveCaptcha(): Promise<HCaptchaToken> {
      const { CAPTCHA_API, DISCORD_URL, DISCORD_KEY } = process.env

      return new Promise(async (resolve, reject) => {
         await axios.get(`http://2captcha.com/in.php?key=${CAPTCHA_API}&json=1&method=hcaptcha&pageurl=${DISCORD_URL}&sitekey=${DISCORD_KEY}`)
            .then(async res => {
               const id = res.data.request;

               // Just because i don't want to write "while(true) {}"
               for (;;) {
                  await axios.get(`https://2captcha.com/res.php?key=${CAPTCHA_API}&action=get&id=${id}&json=1`)
                     .then(async r => {
                        const { status, request } = res.data;

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