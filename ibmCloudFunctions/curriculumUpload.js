const mammoth = require("mammoth");
const fileType = require('file-type');
const pdfjs = require('pdfjs-dist/build/pdf')
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');

const nlpParams = {
  version: '2019-07-12',
  iam_apikey: '3let6AFHFy1vFvEkmaUIywzLNllGb7600KY5ZCTbVuQr',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
}
const NLP = new NaturalLanguageUnderstandingV1(nlpParams);

const DiscoveryV1 = require('ibm-watson/discovery/v1');
const discovery = new DiscoveryV1({
  version: '2019-04-30',
  iam_apikey: 'wxtMkAhLgP7Jhq1TIWcHT6unOWfFYxwxOvY-udGfdLk8',
  url: 'https://gateway.watsonplatform.net/discovery/api'
});

async function uploadToDiscovery(document) {
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
      throw 'There was a problem uploading the file into Watson Discovery.';
    }
  }
  else {
    throw 'No document was found';
  }

}
async function analyzeText(text) {
  if (text) {
    const analyzeParams = {
      text: text,
      features: {
        relations: {},
        keywords: {
          sentiment: true,
          emotion: true,
          limit: 10
        },
        concepts: {
          limit: 10
        },
        categories: {
          limit: 5
        },
        entities: {
          model: 'c68ff2df-f93e-4dec-82c2-8cab83862d45'
        },
        relations: {
          model: 'c68ff2df-f93e-4dec-82c2-8cab83862d45'
        }
      }
    }
    try {
      const analysisResults = await NLP.analyze(analyzeParams);
      return analysisResults;
     }
     catch(err) {
                  console.log(err);
                  throw err;
  }
  }
  else {
    throw 'No text was found in the request'
  }
}

async function main(params) {
  let documentString = params.__ow_body;
  const documentBuffer = new Buffer( documentString, 'base64' );
  if (documentBuffer) {
    if (fileType(documentBuffer).ext == 'pdf') {
      try {
        let finalString;
        const pdf = await pdfjs.getDocument(documentBuffer);
        const totalPages = await pdf._pdfInfo.numPages;
        for (let i = 1; i <= totalPages; i++) {
           const pdfPage = await pdf.getPage(i);
           const textContent = await pdfPage.getTextContent();
           textContent.items.forEach(item => {
            finalString += item.str + ' ';
          })
        }
        finalString = finalString.replace(/\s+/g,' ').trim();

        //Text analysis.
        const analysisResult = await analyzeText(finalString);
        //Upload to Watson Discovery
        const discoveryData = await uploadToDiscovery(documentBuffer);
        return ({
          statusCode: 200,
          body: {
          text: finalString,
          analysisResult: analysisResult,
          discoveryData: discoveryData
          }
        })
      }
      catch(err) {
        return ({
          statusCode: 500,
          body: {
            error: 'There was a problem extracting text from a pdf file.',
            err: err
          }
        })
      }
    }

    else if (fileType(documentBuffer).ext == 'docx' ||fileType(documentBuffer).ext == 'zip' ) {
      try {
      const result = await mammoth.extractRawText({buffer: documentBuffer});
      //Start of text analysis.
      const analysisResult = await analyzeText(result.value);
      //End of text analysis.
      return ({
        statusCode: 200,
        body: {
        text: result.value,
        messages: result.messages,
        analysisResult: analysisResult
        }
      })
      }
      catch(err) {
        return ({
          statusCode: 500,
          body: {
            error: 'There was a problem extracting text from a docx file.',
            err: err
          }
        })
      }
    }
    else {
      return ({
        statusCode: 400,
        body: {
          error: 'A file with an invalid file type was sent in the request. Only PDF and docx is allowed',
          typeDetected: fileType(documentBuffer)
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

global.main = main;