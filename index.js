const readline = require('readline');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const simularWatson = () => {
  return new Promise((resolve, reject) => {
    terminal.question('¿Qué responde watson? ', (res) => {
      resolve(res);
    })
  });
};

const ask = () => {
  terminal.question('Tú: ', async (res) => {
    let result = await simularWatson();
    console.log('Watson: ', result);
    ask();
  });
}

ask();
