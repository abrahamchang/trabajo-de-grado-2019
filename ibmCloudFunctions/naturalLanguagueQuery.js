const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const discovery = new DiscoveryV1({
  version: '2019-04-30',
  authenticator: new IamAuthenticator({
    apikey: 'wxtMkAhLgP7Jhq1TIWcHT6unOWfFYxwxOvY-udGfdLk8',
  }),
  url: 'https://gateway.watsonplatform.net/discovery/api',
});

let queryParams = {
  environmentId: '65ccf592-7de2-4f26-9eaf-1b06baa90367',
  collectionId: '34ca2aa1-9a06-47e6-b6dc-dc4cb7194b9a',
};

async function main(params) {
  const nlpQuery = params.nlpQuery;
  if (nlpQuery) {
  queryParams.naturalLanguagueQuery = nlpQuery;
  const queryResponse = await discovery.query(queryParams);
  return queryResponse;
  }
  else {
    return ({
      statusCode: 400,
      body: {
        error: 'No text was provided in the request.'
      }
    })
  }
}