import readline from 'readline';

let rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

const question = (message: string) =>
   new Promise<string>(resolve => rl.question(message, resolve))
      .finally(() => rl.close());

function readInput(message: string): Promise<string> {
   return question(message);
}

export {
   readInput
}