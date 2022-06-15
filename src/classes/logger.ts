import winston from 'winston';
import path from 'path';

const { combine, timestamp, align, printf } = winston.format;

export default winston.createLogger({
   level: 'info',
   transports: [
      new winston.transports.Console(),
      new winston.transports.File({ 
         filename: path.join(process.cwd(), 'logs', 'logs.log')
      })
   ],
   format: combine(
      timestamp({
         format: 'hh:mm:ss',
      }),
      align(),
      printf(info => `[${info.timestamp}] ${info.message}`)
   )
});