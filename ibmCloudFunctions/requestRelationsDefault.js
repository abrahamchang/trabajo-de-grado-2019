const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');

const nlpParams = {
  version: '2019-07-12',
  iam_apikey: '3let6AFHFy1vFvEkmaUIywzLNllGb7600KY5ZCTbVuQr',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
}
const NLP = new NaturalLanguageUnderstandingV1(nlpParams);

async function main(params)  {
  const {text} = params;
  if (text) {
    const analyzeParams = {
      text: text,
      features: {
        relations: {}
      }
    }
    try {
      const analysisResults = await NLP.analyze(analyzeParams);
      return ({
        statusCode: 200,
        body: analysisResults
      })
     }
     catch(err) {
                  console.log(err);
                  return ({
                    statusCode: 500,
                    body: {
                      error: err
                    }
                  })
  }
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