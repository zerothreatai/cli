import readline from 'readline';

export function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });

    rl.on('SIGINT', () => {
      rl.close();
      console.log('\nExiting...');
      process.exit(0);
    });
  });
}
