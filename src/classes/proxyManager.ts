import fs from 'fs';
import path from 'path';
import { ProxyI } from '../interfaces';

/**
 * This class basically does the job of read and return proxies
 * @author Raskolnikov
 */
class ProxyManager {
   /**
    * This function returns a Proxy Interface based into this format -> "adress:port:user:password"
    * and they are readed from cwd/files/proxies.txt
    * @returns {ProxyI} 
    * @author Raskolnikov
    */
   get randomProxy(): ProxyI {
      const proxies = fs
         .readFileSync(path.join(process.cwd(), 'files', 'proxies.txt'), { encoding: 'utf-8' })
         .split('\n');

      const [ip, port, user, password] = proxies[Math.floor(Math.random() * proxies.length)].split(':');
      
      return { address: ip, port: parseInt(port), user: user, password: password.replace('\r', '') } as ProxyI;
   }

   /**
    * This method does the reverse path
    * It turns a proxy interface into a formated string "adress:Port:user:password"
    * @param proxy
    * @returns {string}
    * @author Raskolnikov
    */
   stringify(proxy: ProxyI): string {
      const { address, port, user, password } = proxy;

      return `${address}:${port}:${user}:${password}`;
   }

   /**
    * This method does the reverse path
    * It turns a proxy interface into a formated string "adress:Port:user:password"
    * @param proxy
    * @returns {string}
    * @author Raskolnikov
    */
   objectify(proxy: ProxyI): object {
      const { address, port, user, password } = proxy;

      return {
         protocol: 'https',
         host: address,
         port: port,
         auth: { username: user, password: password }
      };
   }
}

export default ProxyManager;