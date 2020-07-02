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

const flujo = async () => {
  let session = await crearSession();
  let id_session = session.result.session_id;
  await deleteSession(id_session);
};

flujo();

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