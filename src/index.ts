import axios from 'axios';
import { getFingerprint } from './utils';
import { CaptchaBypasser } from './classes'

async function main() {
   let username = `usuario${Math.floor(Math.random()*1000)}`;
   let password = `senha${Math.floor(Math.random()*1000)}`;
   let fingerprint = await getFingerprint();

   const payload = {
      captcha_key: '',
      consent: true,
      date_of_birth: (Math.floor(Math.random() * (2001 - 1990 + 1)) + 1990).toString() + "-" + (Math.floor(Math.random() * 12) + 1).toString() + "-" + (Math.floor(Math.random() * 28) + 1).toString(),
      fingerprint: fingerprint,
      gift_code_sku_id: null,
      invite: null,
      password,
      promotional_email_opt_in: false,
      username
   }, config = {
      headers: {
         'X-Fingerprint': fingerprint,
         'X-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJmciIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjEwMC4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzEwMC4wIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTAwLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTI3MTM1LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ=='
      },
      // validateStatus: (status) => true
   }

   let registered = await axios.post('https://discord.com/api/v9/auth/register', payload, config);
   if (registered.status === 400) {
      const cb = new CaptchaBypasser();
      const captchaKey = cb.bypass()
   }
   let data = registered.data;

   console.log(data);
}

main();