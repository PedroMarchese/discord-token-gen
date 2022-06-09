import { EmailI } from '../interfaces';
import axios from 'axios';

/**
 * This class manages all hotmailbox API interaction
 * @author Raskolnkikov
 */
class EmailManager {
   /**
    * This method buys an email from hotmailbox and throw Error you don't have enough balance
    * @author Raskolnkikov
    * @param {number}
    * @returns {Promise<EmailI | undefined>}
    */
   public async buyOne(): Promise<EmailI | undefined> {
      const apiUrl = `https://api.hotmailbox.me/mail/buy?apikey=${process.env.HOTMAIL_BOX}&mailcode=HOTMAIL&quantity=1`;
      let email: EmailI | undefined = undefined;

      // Sends a hotmailbox request for buy an email 
      axios
         .get(apiUrl, { timeout: 3000 })
         .then(res => {
            email = res.data.Data.Emails[0] as EmailI;
         })
         .catch(err => console.log(err));

      return email;
   }
}

export default EmailManager;