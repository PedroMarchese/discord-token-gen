const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));
const sleepS = (time: number) => new Promise(resolve => setTimeout(resolve, time*1000));
const syncSleep = (time: number) => {
   const startTime = Date.now();
   let currentTime: number;
   
   do {
      currentTime = Date.now()
   } while (currentTime - startTime < time);
} 

const syncSleepS = (time: number) => {
   const startTime = Date.now();
   let currentTime: number;
   
   do {
      currentTime = Date.now()
   } while (currentTime - startTime < time * 1000);
}

export {
   sleep,
   sleepS,
   syncSleep,
   syncSleepS
}