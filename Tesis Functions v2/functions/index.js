const functions = require('firebase-functions');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const https = require('https');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const nlpParams = {
  version: '2019-07-12',
  iam_apikey: '3let6AFHFy1vFvEkmaUIywzLNllGb7600KY5ZCTbVuQr',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
}
const NLP = new NaturalLanguageUnderstandingV1(nlpParams);
exports.requestCategories = functions.https.onRequest(async (req, res) => {
  const {text} = req.body;
  if (text) {
    const analyzeParams = {
      text: text,
      features: {
        categories: {
          limit: 5
        }
      }
    }
     try {
      const analysisResults = await NLP.analyze(analyzeParams);
      return res.status(200).send(analysisResults);
     }
     catch(err) {
                  console.log(err);
                  return res
                    .status(400)
                    .send(
                      JSON.stringify({
                        errorMessage: 'There was an error with Watson.',
                      })
                    );
                }
  }
  else {
    return res.status(400).send('No text was provided for analysis.')
  }
});

exports.requestConcepts = functions.https.onRequest(async (req, res) => {
  const {text} = req.body;
  if (text) {
    const analyzeParams = {
      text: text,
      features: {
        concepts: {
          limit: 10
        },
      }
    }
     try {
      const analysisResults = await NLP.analyze(analyzeParams);
      return res.status(200).send(analysisResults);
     }
     catch(err) {
                  console.log(err);
                  return res
                    .status(400)
                    .send(
                      JSON.stringify({
                        errorMessage: 'There was an error with Watson.',
                      })
                    );
                }
  }
  else {
    return res.status(400).send('No text was provided for analysis.')
  }
});


// exports.requestEmotion = functions.https.onRequest(async (req, res) => {
//   const {text} = req.body;
//   if (text) {
//     const analyzeParams = {
//       text: text,
//       features: {
//       emotion: {
//         targets: [
//           'esfuerzo',
//           'experiencia'
//         ]
//       }
//     }
//     }
//      try {
//       const analysisResults = await NLP.analyze(analyzeParams);
//       return res.status(200).send(JSON.stringify(analysisResults, null, 2));
//      }
//      catch(err) {
//                   console.log(err);
//                   return res
//                     .status(400)
//                     .send(
//                       JSON.stringify({
//                         errorMessage: 'There was an error with Watson.',
//                         error: err
//                       })
//                     );
//                 }
//   }
//   else {
//     return res.status(400).send('No text was provided for analysis.')
//   }
// });

exports.requestEntitiesDefaultModel = functions.https.onRequest(async (req, res) => {
  const {text} = req.body;
  if (text) {
    const analyzeParams = {
      text: text,
      features: {
        entities: {
          limit: 10
        }
      }
    }
     try {
      const analysisResults = await NLP.analyze(analyzeParams);
      return res.status(200).send(analysisResults);
     }
     catch(err) {
                  console.log(err);
                  return res
                    .status(400)
                    .send(
                      JSON.stringify({
                        errorMessage: 'There was an error with Watson.',
                      })
                    );
                }
  }
  else {
    return res.status(400).send('No text was provided for analysis.')
  }
});

exports.requestKeywords = functions.https.onRequest(async (req, res) => {
  const {text} = req.body;
  if (text) {
    const analyzeParams = {
      text: text,
      features: {
        keywords: {
          sentiment: true,
          emotion: true,
          limit: 10
        }
      }
    }
     try {
      const analysisResults = await NLP.analyze(analyzeParams);
      return res.status(200).send(analysisResults);
     }
     catch(err) {
                  console.log(err);
                  return res
                    .status(400)
                    .send(
                      JSON.stringify({
                        errorMessage: 'There was an error with Watson.',
                        err: err
                      })
                    );
                }
  }
  else {
    return res.status(400).send('No text was provided for analysis.')
  }
});

exports.requestRelations = functions.https.onRequest(async (req, res) => {
  const {text} = req.body;
  if (text) {
    const analyzeParams = {
      text: text,
      features: {
        relations: {}
      }
    }
     try {
      const analysisResults = await NLP.analyze(analyzeParams);
      return res.status(200).send(analysisResults);
     }
     catch(err) {
                  console.log(err);
                  return res
                    .status(400)
                    .send(
                      JSON.stringify({
                        errorMessage: 'There was an error with Watson.',
                      })
                    );
                }
  }
  else {
    return res.status(400).send('No text was provided for analysis.')
  }
});

exports.requestAll = functions.https.onRequest(async (req, res) => {
  const {text} = req.body;
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
          limit: 10
        }
      }
    }
     try {
      const analysisResults = await NLP.analyze(analyzeParams);
      return res.status(200).send(analysisResults);
     }
     catch(err) {
                  console.log(err);
                  return res
                    .status(400)
                    .send(
                      JSON.stringify({
                        errorMessage: 'There was an error with Watson.',
                      })
                    );
                }
  }
  else {
    return res.status(400).send('No text was provided for analysis.')
  }
});

const mammoth = require("mammoth");
const fileType = require('file-type');
const pdfjsLib = require('pdfjs-dist/build/pdf');

exports.extractDocx = functions.https.onRequest(async (req, res) => {
    const documentBuffer = new Buffer( req.body, 'base64' );
  try {

  return res.status(200).send('hola')
  }
  catch(err) {
    return res.status(500).send({
      err: err,
      req: req
    })
  }
  if (documentBuffer) {
    if (fileType(documentBuffer).ext == 'docx' || fileType(documentBuffer).ext == 'zip' ) {
      try {
      const result = await mammoth.extractRawText({buffer: documentBuffer});
      console.log(result)
      return res.status(200).send({
        text: result.value,
        messages: result.messages
        }
      )
      }
      catch(err) {
        return res.status(500).send(
              {
            error: 'There was a problem extracting text from a docx file.',
            err: err
          }
          )

      }
    }
    else {
      return (res.status(400).send({
        error: 'A file with an invalid file type was sent in the request. Only PDF and docx is allowed',
        typeDetected: fileType(documentBuffer)
      }))
    }

  }

  else {
    return (res.status(400).send({
      error: 'No file was found in the request',
      typeDetected: fileType(documentBuffer)
    }))
  }
})

exports.extractFile = functions.https.onRequest(async (req, res) => {
  let documentString = req.body;
  const documentBuffer = new Buffer( documentString, 'base64' );
  console.log(fileType(documentBuffer).ext);
  if (documentBuffer) {
    if (fileType(documentBuffer).ext == 'pdf') {
      try {
        let finalString = '';
        const pdf = await pdfjsLib.getDocument({data: documentBuffer});
        const totalPages = await pdf._pdfInfo.numPages;
        for (let i = 1; i <= totalPages; i++) {
           const pdfPage = await pdf.getPage(i);
           const textContent = await pdfPage.getTextContent();
           console.log(textContent);
           textContent.items.forEach(item => {
             finalString += item.str + ' ';
           })
        }
        finalString = finalString.replace(/\s+/g,' ').trim();
        return res.status(200).send({text: finalString});
      }
      catch(err) {
        return res.status(500).send({
          error: 'There was a problem extracting text from a docx file.',
          err: err
        });
      }
    }
    else if (fileType(documentBuffer).ext == 'docx' || fileType(documentBuffer).ext == 'zip' ) {
      try {
      const result = await mammoth.extractRawText({buffer: documentBuffer});
      console.log(result)
      return res.status(200).send({
        text: result.value,
        messages: result.messages
        }
      )
      }
      catch(err) {
        return res.status(500).send(
              {
            error: 'There was a problem extracting text from a docx file.',
            err: err
          }
          )

      }
    }
    else {
      return (res.status(400).send({
        error: 'A file with an invalid file type was sent in the request. Only PDF and docx is allowed',
        typeDetected: fileType(documentBuffer)
      }))
    }

  }

  else {
    return (res.status(400).send({
      error: 'No file was found in the request',
      typeDetected: fileType(documentBuffer)
    }))
  }
})

exports.extractText = functions.https.onRequest(async (req, res) => {
const doc = req.body;

const postData = req.body;
const options = {
  host: 'https://us-south.functions.cloud.ibm.com/api/v1/web/lucianopinedo%40gmail.com_dev/default/extractFile',
  port: 80,
  method: 'POST',
  headers: {
  }
};

const request = http.request(options, (res) => {
  console.log(res)

});

request.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});
request.write(postData);
request.end();

})
