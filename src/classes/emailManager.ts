import { EmailI } from '../interfaces';
import axios from 'axios';

/**
 * This class manages all hotmailbox API interaction
 * @author Raskolnkikov
 */
class EmailManager {
   /**
    * Returns a random email with no value just to register the account
    * @author Raskolnkikov
    * @returns {EmailI}
    */
   public getRandom(): EmailI {
      return {
         Email: `${Math.random().toString(36).slice(2, 30)}@hotmail.com`,   
      } as EmailI;
   }

   /**
    * This method buys an email from hotmailbox and throw Error you don't have enough balance
    * @author Raskolnkikov
    * @param {number}
    * @returns {Promise<EmailI | undefined>}
    */
   public async buyOne(): Promise<EmailI> {
      const apiUrl = `https://api.hotmailbox.me/mail/buy?apikey=${process.env.HOTMAIL_BOX}&mailcode=HOTMAIL&quantity=1`;
      console.log(apiUrl);
      
      let email: EmailI;

      // Sends a hotmailbox request for buy an email 
      axios.get(apiUrl, { timeout: 60000 })
         .then(res => {
            console.log(res.data)
            email = res.data.Data.Emails[0] as EmailI;
         })
         .catch(err => console.log(err));

      return email!;
   }
}

export default EmailManager;