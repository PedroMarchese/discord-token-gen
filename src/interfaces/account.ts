import { EmailI } from '.';

export default interface AccountI {
   CreatedAt: Date;
   Token: string;
   Phone?: string;
   Email: EmailI;
}