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

      return proxies[Math.floor(Math.random() * proxies.length)];
   }
}

export default ProxyManager;