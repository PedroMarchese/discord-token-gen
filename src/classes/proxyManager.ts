import fs from 'fs';
import path from 'path';
import { ProxyI } from '../interfaces';

/**
 * This class basically does the job of read and return proxies
 * @author Raskolnikov
 */
class ProxyManager {
   /**
    * This class returns a Proxy Interface based into this format -> "adress:port:user:password"
    * and they are readed from cwd/files/proxies.txt
    * @returns {ProxyI} 
    * @author Raskolnikov
    */
   get randomProxy(): ProxyI {
      const proxies = fs
         .readFileSync(path.join(process.cwd(), 'files', 'proxies.txt'), { encoding: 'utf-8' })
         .split('\n');

      const [address, port, user, password] = proxies[Math.floor(Math.random() * proxies.length)].split(':');
      
      return { address: address, port: parseInt(port), user: user, password: password } as ProxyI;
   }
}

export default ProxyManager;