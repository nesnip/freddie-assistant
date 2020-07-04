const readline = require('readline');
const { crearSession, deleteSession, sendMessage } = require('./watson');

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

const ask = (id_session) => {
  terminal.question('Tú: ', async (res) => {
    if (res === 'exit') {
      await deleteSession(id_session);
      terminal.close();
      return
    }
    let result = await sendMessage(res, id_session);
    let texts = result.result.output.generic;

    console.log('Watson: ', texts);
    ask(id_session);
  });
}

const flujo = async () => {
  let session = await crearSession();
  let id_session = session.result.session_id;
  ask(id_session);
};

flujo();
