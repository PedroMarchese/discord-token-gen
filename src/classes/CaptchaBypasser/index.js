import axios from 'axios';
import { PythonShell } from 'python-shell';

export default class CaptchaBypasser {
   constructor() {
   }

   bypass(proxy=null) {
      const options = {
         args: [proxy]
      }
      
      let key;
      PythonShell.run('bypass.py', options, async (err, [, captchaKey]) => {
         key = captchaKey;
      })

      console.log(key)
      return `${key}`;
   }
}