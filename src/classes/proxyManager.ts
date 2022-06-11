import fs from 'fs';
import path from 'path';
import { ProxyI } from '../interfaces';

/**
 * This class basically does the job of read and return proxies
 * @author Raskolnikov
 */
class ProxyManager {
   get randomProxy(): ProxyI {
      const proxies = fs
         .readFileSync(path.join(process.cwd(), 'files', 'proxies.txt'), { encoding: 'utf-8' })
         .split('\n')

      const [ address, port, user, password] = proxies[Math.floor(Math.random() * proxies.length)].split(':');
      const newProxy: ProxyI = { address: address, port: parseInt(port), password?: password, a?: }
      return newProxy;
   }
}

export default ProxyManager;