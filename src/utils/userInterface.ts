import readline from 'readline';

let rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

function readInput(message: string): string {
   let input = '';
   
   rl.question(message, answer => {
      input = answer;
   });

   rl.close();

   return input;
}

export {
   readInput
}