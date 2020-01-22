const DiscoveryV1 = require('ibm-watson/discovery/v1');
//const { IamAuthenticator } = require('ibm-watson/auth');

const discovery = new DiscoveryV1({
  version: '2019-04-30',
  iam_apikey: "xkDn4vGf9MhUApOdHGnrzxRWIgWRyOKWh2T8vumzcXdo",
  url: 'https://gateway.watsonplatform.net/discovery/api',
});


async function main(params) {
  const nlpQuery = params.nlpQuery;
  if (nlpQuery) {
      const queryParams = {
          environment_id: '65ccf592-7de2-4f26-9eaf-1b06baa90367',
          collection_id: '34ca2aa1-9a06-47e6-b6dc-dc4cb7194b9a',
          query: nlpQuery,
          passages: true
      };
      discovery.qu
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