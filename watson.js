const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: 'R2VQQq77cm3MtmQSAw3wHGqfwA21Ghuw390h0RUI13oi',
  }),
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com',
});

const crearSession = () => {
  return assistant.createSession({
    assistantId: '1a363677-648b-41d6-9d5f-5c343fe1acb3',
  });
};

const deleteSession = (id_session) => {
  return assistant.deleteSession({
    assistantId: '1a363677-648b-41d6-9d5f-5c343fe1acb3',
    sessionId: id_session,
  });
};

const sendMessage = (input, id_session) => {
  return assistant.message({
    assistantId: '1a363677-648b-41d6-9d5f-5c343fe1acb3',
    sessionId: id_session,
    input: {
      'message_type': 'text',
      'text': input,
      }
    });
}

module.exports = {
  crearSession,
  deleteSession,
  sendMessage,
}

/* const flujo = async () => {
  let session = await crearSession();
  let id_session = session.result.session_id;
  let result = await sendMessage('holi', id_session);
  let texts = result.result.output.generic;
  console.log(texts);
  
  await deleteSession(id_session);
};

flujo(); */

// df4df02e-9ef5-46ba-a345-07d7392ad029

/* assistant.createSession({
  assistantId: '1a363677-648b-41d6-9d5f-5c343fe1acb3'
}).then(res => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  }); */

/* assistant.deleteSession({
  assistantId: '1a363677-648b-41d6-9d5f-5c343fe1acb3',
  sessionId: 'dcc89bb6-b8dc-431e-8664-10bb6c17507c',
}).then(res => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  }); */