import axios from 'axios';
import { ProxyI } from '../interfaces';
import { sleep } from '../utils';
import logger from './logger';

type HCaptchaToken = string;

export default class CaptchaSolver {
   async solveCaptcha(): Promise<HCaptchaToken> {
      const { CAPTCHA_API, DISCORD_URL, DISCORD_KEY } = process.env;

      const res = await axios.get(`http://2captcha.com/in.php?key=${CAPTCHA_API}&json=1&method=hcaptcha&pageurl=${DISCORD_URL}&sitekey=${DISCORD_KEY}`)
      const id = res.data.request;

      await sleep(5000);

      // Just because i don't want to write "while(true) {}"
      for (;;) {
         const r = await axios.get(`https://2captcha.com/res.php?key=${CAPTCHA_API}&action=get&id=${id}&json=1`, { timeout: 15000 })
         const { status, request } = r.data;

         logger.log('info', `${JSON.stringify({ status: status, request: (request as string).slice(0, 20) })}`);
         //! CAPTCHA SOLVED
         if ( status == 0 && request == 'CAPCHA_NOT_READY') {
            await sleep(10000);
         } else if (status == 1) {
            // Success with captcha token
            return request;
         } else {
            return JSON.stringify({status, request});
         }
      }               
   }
}