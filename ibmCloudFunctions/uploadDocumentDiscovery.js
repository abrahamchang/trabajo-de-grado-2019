const DiscoveryV1 = require('ibm-watson/discovery/v1');
const discovery = new DiscoveryV1({
  version: '2019-04-30',
  iam_apikey: 'wxtMkAhLgP7Jhq1TIWcHT6unOWfFYxwxOvY-udGfdLk8',
  url: 'https://gateway.watsonplatform.net/discovery/api'
});


async function main(params) {
  let documentString = params.__ow_body;
  const document = new Buffer( documentString, 'base64' );
  if (document) {
  const addDocumentParams = {
    environment_id: '65ccf592-7de2-4f26-9eaf-1b06baa90367',
    collection_id: '34ca2aa1-9a06-47e6-b6dc-dc4cb7194b9a',
    file: document,
  };
  try {
    const documentAccepted = await discovery.addDocument(addDocumentParams);
    return documentAccepted;
  }
  catch(err) {
    console.log(err)
    return ({
      statusCode: 500,
      body: {
        errorMessage: 'There was a problem uploading the file into Watson Discovery.',
        err: err
      }
    })
  }
}
else {
  return ({
    statusCode: 400,
    body: {
      error: 'No file was provided in the request. '
    }
  })
}


}