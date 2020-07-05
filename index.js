const express = require('express');
const {
  FB, Text, Typing, Image, QuickReplies,
  QuickRepliesOption, DownloadFile,
} = require('adathink-sdk-bot');

const {
  crearSession, deleteSession, sendMessage,
} = require('./watson');

const app = express();

// Parsear las rptas json que envía facebook
app.use(express.json());

//IMPORTANTE!!

FB.config({
  TOKEN_FACEBOOK: 'EAAIv9kVfTHABADZCvhLwlfGtiZC2wR1QBZBdYFACnXohLx4NZBcahvebl9tNsbXXczxvyBHa6cWR0RckjjTjNBfgRy40F92BYt5zYV3DXO981ZAJZBRzfRpwZC8QMXZB2GHRRDHe2Kd4krSUCPjWqZAsd5XDXG83FhhmzCKjNAL93JgZDZD',
  KEY_FACEBOOK: 'Freddie Code', 
});

// Enlace entre el servidor y el webhook de facebook Dev
app.get('/', FB.checkWebhook);

// local DB temporal
const user = {};

// Aquí llegan los msjes de facebook
app.post('/', async (req, res) => {
  // mandar un ok a facebook
  res.sendStatus(200);
  // console.log('Llegó un msje', req.body);

  const FBTools = new FB(req.body);

  let id = FBTools.getId();

  let session_id;

  if (user[id]) {
    session_id = user[id];
    console.log(id);
    console.log(session_id);
  } else {
    const session = await crearSession();
    session_id = session.result.session_id;
    user[id] = session_id;
    console.log(session_id);
  }

  // obtener msje de texto del usuario
  const message = FBTools.getMessage();
  console.log(message);

  const response = await sendMessage(message, session_id);
  console.log(response.result.output.generic);

  // array de rptas de watson (objetos)
  const watson_response = response.result.output.generic;

  FBTools.sendDirect(new Typing());
  await FBTools.sleep(1000);

  watson_response.forEach((obj) => {
    switch (obj.response_type) {
      case 'text':
        FBTools.addResponse(new Text(obj.text));
        break;
      case 'option':
        const quick_replies = new QuickReplies(obj.title + '\n(' + obj.description + ')');
        console.log(obj.options);
        obj.options.forEach((el) => {
          const label = el.label;
          const value = el.value.input.text;
          const option = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_TEXT, label, value);
          quick_replies.addOption(option);
          console.log(value);
        });
        // FBTools.addResponse(new Text(obj.description));
        FBTools.addResponse(quick_replies);
        break;
      case 'image':
        FBTools.addResponse(new Text(obj.title));
        FBTools.addResponse(new Text(obj.description));
        FBTools.addResponse(new Image(obj.source));
        break;
      default:
        break;
    }
  });

  const response_status = await FBTools.sendResponse();  
  
  // await deleteSession(session_id);

  // obtener msje del payload de un quickreplies
  // console.log(FBTools.getPayload());

  // el bot está escribiendo...
  /* FBTools.sendDirect(new Typing());
  await FBTools.sleep(1000); */

  // manda imagen
  /* const image = new Image('https://ep01.epimg.net/cultura/imagenes/2019/04/11/actualidad/1554992877_490212_1555496326_noticia_normal.jpg');
  FBTools.sendDirect(image); */

  // rptas con botones para opciones
  /* const quick = new QuickReplies('estas opciones');
  const option_email = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_EMAIL);
  const option_text = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_TEXT, 'OK', '666'); //OK puede ser una opción

  quick.addOption(option_email);
  quick.addOption(option_text);
  FBTools.sendDirect(quick); */

  // obtener info de usuario
  // const user = await FBTools.getInfoUser();
  // console.log(user);

  // manda texto
  /* const texto1 = new Text(`Holi ${user.first_name}, soy Freddie`);
  FBTools.sendDirect(texto1); */

  // foto de perfil del usuario
  /* const image = new Image(user.profile_pic);
  FBTools.sendDirect(image); */

  // descarga foto de perfil 
  /* const download =  await DownloadFile.syncDownload(user.profile_pic, {ruta:"./files/perfil.jpg"});
  console.log(download); */

  // mandar respuestas en bloque al usuario
  /* FBTools.addResponse(new Typing());
  FBTools.addResponse(new Text('Hola soy Freddie :)'));
  FBTools.addResponse(new Image(''));
  FBTools.addResponse(new Text('¿En qué te puedo ayudar?'));

  const quick = new QuickReplies('Tienes estas opciones');
  const option_email = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_EMAIL);
  const option_text = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_TEXT, 'OK', '666'); //OK puede ser una opción

  quick.addOption(option_email);
  quick.addOption(option_text);

  FBTools.addResponse(quick); */

  /* const result = await FBTools.sendResponse();
  console.log(result); */
});

app.listen(process.env.PORT || 3150 , () => {
  console.log("Mi servidor esta ejecutando");
});
