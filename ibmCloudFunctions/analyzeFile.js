const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');

const nlpParams = {
  version: '2019-07-12',
  iam_apikey: '3let6AFHFy1vFvEkmaUIywzLNllGb7600KY5ZCTbVuQr',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
}

function readFile() {
  console.log(this.currentFile);
  const fileExtension = this.currentFile.name.split('.')[this.currentFile.name.split('.').length - 1];
  console.log(fileExtension);

  fileExtension == 'pdf' ? this.readPdf() : fileExtension == 'docx' ? this.readDocx() : console.log('Unhandled file type');

}

const NLP = new NaturalLanguageUnderstandingV1(nlpParams);
async function main(params)  {
  const {file, features} = params;
  if (file && features) {

    const analyzeParams = {
      text: text,
      features: features
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