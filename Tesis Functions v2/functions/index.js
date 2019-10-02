const functions = require('firebase-functions');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');


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

