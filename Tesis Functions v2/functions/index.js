const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Fuse = require('fuse.js')
const serviceAccount = require("./trabajo-de-grado-2019-firebase-adminsdk-y8if7-558a20c3cb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trabajo-de-grado-2019.firebaseio.com"
});




exports.advancedSearch = functions.https.onRequest(async (req, res) => {
  try {
  const { languages, previousWorks, universities, titles, workExperienceYears, workplaces, age, hasTitle, hasExperience, cities, searchTerm} = await JSON.parse(req.body);
  let compoundQuery = admin.firestore().collection('Curriculums');
  if (hasExperience) {
    compoundQuery.where('workExperienceYears', '>', 0)
  }
  const queryResult = await compoundQuery.get();
  let baseResult = [];

  queryResult.forEach(doc => {
    let resultItem = {
      curriculumData: doc.data(),
      id: doc.id,
      languageFound: languages ? false : null,
      languageWeight: languages ? languages.weight : null,
      previousWorksFound: previousWorks ? false : null,
      previousWorksWeight: previousWorks ? previousWorks.weight : null,
      universitiesFound: universities ? false : null,
      universitiesWeight: universities ? universities.weight : null,
      titlesFound: titles ? false : null,
      titlesWeight: titles ? titles.weight : null,
      workExperienceYearsFound: workExperienceYears ? false : null,
      workExperienceYearsWeight: workExperienceYears ? workExperienceYears.weight : null,
      workplacesFound: workplaces ? false : null,
      workplacesWeight: workplaces? workplaces.weight : null,
      citiesFound: cities ? false : null,
      citiesWeight: cities ? cities.weight : null,
      searchTermFound: searchTerm ? false : null,
      searchTermWeight: searchTerm ? searchTerm.weight : null
    }
    resultItem.curriculumData.workExperience.forEach(work => {
      work.completeWorkPosition = work.workPosition + ' ' + (work.workSpecialization ? work.workSpecialization : '')
    })
    baseResult.push(resultItem)
  })

  if (titles) {
    let titlesOptions = {
      id: 'id',
      keys: ['curriculumData.educationExperience.educationTitle'],
      shouldSort: true,
      findAllMatches: true,
      includeScore: true,
      threshold: 0.3,
    }
    const fuse = new Fuse(baseResult, titlesOptions);
    titles.value.forEach(title => {
      const foundIds = fuse.search(title);
      baseResult.forEach(arrayItem => {
        foundIds.forEach(foundId => {
          if (arrayItem.id == foundId.item && foundId.score != 1) {
            arrayItem.titlesFound = true;
            arrayItem.titleScore = foundId.score;
          }
        })
      })
    })
  }

  if (searchTerm) {
    const options = {
      id: 'id',
      keys: ['curriculumData.keywords', 'curriculumData.concepts', 'curriculumData.categories'],
      shouldSort: true,
      findAllMatches: true,
      includeScore: true,
      threshold: 0.3,
    }
    const fuse = new Fuse(baseResult, options)
    const foundIds = fuse.search(searchTerm.value)
    baseResult.forEach(arrayItem => {
      foundIds.forEach(foundId => {
        if (arrayItem.id == foundId.item && foundId.score != 1) {
          arrayItem.searchTermFound = true
          arrayItem.searchTermScore = foundId.score
        }
      })
    })
  }

  if (workExperienceYears) {
    baseResult.forEach(arrayItem => {
      arrayItem.curriculumData.workExperienceYears >= workExperienceYears.value ?
      arrayItem.workExperienceYearsFound = true :  arrayItem.workExperienceYearsFound = false
    })
  }

  if (previousWorks) {
    let previousWorksOptions = {
      id: 'id',
      keys: ['curriculumData.workExperience.completeWorkPosition'],
      shouldSort: true,
      findAllMatches: true,
      includeScore: true,
      threshold: 0.3,
    }
    const fuse = new Fuse(baseResult, previousWorksOptions)

      previousWorks.value.forEach(previousWork => {
        const foundIds = fuse.search(previousWork);
        baseResult.forEach(arrayItem => {
          foundIds.forEach(foundId => {
            if (arrayItem.id == foundId.item && foundId.score != 1) {
              arrayItem.previousWorksFound = true
              arrayItem.previousWorksScore = foundId.score
            }
          })

        })
      })

  }

  if (workplaces) {
    let workplacesOptions = {
      id: 'id',
      keys: ['curriculumData.workExperience.workplace'],
      shouldSort: true,
      findAllMatches: true,
      includeScore: true,
      threshold: 0.3,
    }
    const fuse = new Fuse(baseResult, workplacesOptions)
      workplaces.value.forEach(workplace => {
        const foundIds = fuse.search(workplace);
        baseResult.forEach(arrayItem => {
          foundIds.forEach(foundId => {
            if (arrayItem.id == foundId.item && foundId.score != 1) {
              arrayItem.workplacesFound = true;
              arrayItem.workplacesScore = foundId.score
            }
          })
        })
      })
  }

  if (languages) {
    let languagesOptions = {
      id: 'id',
      keys: ['curriculumData.languages'],
      shouldSort: true,
      findAllMatches: true,
      includeScore: true,
      threshold: 0.3,
    }
    const fuse = new Fuse(baseResult, languagesOptions)
      languages.value.forEach(language => {
        const foundIds = fuse.search(language);
        baseResult.forEach(arrayItem => {
          foundIds.forEach(foundId => {
           if (arrayItem.id == foundId.item && foundId.score != 1) {
            arrayItem.languagesFound = true
            arrayItem.languagesScore = foundId.score
          }
          })
        })
      })
  }
  if (universities) {
    let universitiesOptions = {
      id: 'id',
      keys: ['curriculumData.educationExperience.educationInstitution'],
      shouldSort: true,
      findAllMatches: true,
      includeScore: true,
      threshold: 0.3,
    }
    const fuse = new Fuse(baseResult, universitiesOptions)
      universities.value.forEach(university => {
        const foundIds = fuse.search(university);
        baseResult.forEach(arrayItem => {

          foundIds.forEach(foundId => {
           if (arrayItem.id == foundId.item && foundId.score != 1) {
            arrayItem.universitiesFound = true
            arrayItem.universitiesScore = foundId.score
          }
          })
        })
      })
  }


  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  return res.status(200).send(baseResult)
 }
  catch(err) {
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.status(500).send(err)
  }




})
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/gmfunctions/gmwrite-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });
// const nlpParams = {
//   version: '2019-07-12',
//   iam_apikey: '3let6AFHFy1vFvEkmaUIywzLNllGb7600KY5ZCTbVuQr',
//   url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
// }
// const NLP = new NaturalLanguageUnderstandingV1(nlpParams);
// exports.requestCategories = functions.https.onRequest(async (req, res) => {
//   const {text} = req.body;
//   if (text) {
//     const analyzeParams = {
//       text: text,
//       features: {
//         categories: {
//           limit: 5
//         }
//       }
//     }
//      try {
//       const analysisResults = await NLP.analyze(analyzeParams);
//       return res.status(200).send(analysisResults);
//      }
//      catch(err) {
//                   console.log(err);
//                   return res
//                     .status(400)
//                     .send(
//                       JSON.stringify({
//                         errorMessage: 'There was an error with Watson.',
//                       })
//                     );
//                 }
//   }
//   else {
//     return res.status(400).send('No text was provided for analysis.')
//   }
// });

// exports.requestConcepts = functions.https.onRequest(async (req, res) => {
//   const {text} = req.body;
//   if (text) {
//     const analyzeParams = {
//       text: text,
//       features: {
//         concepts: {
//           limit: 10
//         },
//       }
//     }
//      try {
//       const analysisResults = await NLP.analyze(analyzeParams);
//       return res.status(200).send(analysisResults);
//      }
//      catch(err) {
//                   console.log(err);
//                   return res
//                     .status(400)
//                     .send(
//                       JSON.stringify({
//                         errorMessage: 'There was an error with Watson.',
//                       })
//                     );
//                 }
//   }
//   else {
//     return res.status(400).send('No text was provided for analysis.')
//   }
// });


// // exports.requestEmotion = functions.https.onRequest(async (req, res) => {
// //   const {text} = req.body;
// //   if (text) {
// //     const analyzeParams = {
// //       text: text,
// //       features: {
// //       emotion: {
// //         targets: [
// //           'esfuerzo',
// //           'experiencia'
// //         ]
// //       }
// //     }
// //     }
// //      try {
// //       const analysisResults = await NLP.analyze(analyzeParams);
// //       return res.status(200).send(JSON.stringify(analysisResults, null, 2));
// //      }
// //      catch(err) {
// //                   console.log(err);
// //                   return res
// //                     .status(400)
// //                     .send(
// //                       JSON.stringify({
// //                         errorMessage: 'There was an error with Watson.',
// //                         error: err
// //                       })
// //                     );
// //                 }
// //   }
// //   else {
// //     return res.status(400).send('No text was provided for analysis.')
// //   }
// // });

// exports.requestEntitiesDefaultModel = functions.https.onRequest(async (req, res) => {
//   const {text} = req.body;
//   if (text) {
//     const analyzeParams = {
//       text: text,
//       features: {
//         entities: {
//           limit: 10
//         }
//       }
//     }
//      try {
//       const analysisResults = await NLP.analyze(analyzeParams);
//       return res.status(200).send(analysisResults);
//      }
//      catch(err) {
//                   console.log(err);
//                   return res
//                     .status(400)
//                     .send(
//                       JSON.stringify({
//                         errorMessage: 'There was an error with Watson.',
//                       })
//                     );
//                 }
//   }
//   else {
//     return res.status(400).send('No text was provided for analysis.')
//   }
// });

// exports.requestKeywords = functions.https.onRequest(async (req, res) => {
//   const {text} = req.body;
//   if (text) {
//     const analyzeParams = {
//       text: text,
//       features: {
//         keywords: {
//           sentiment: true,
//           emotion: true,
//           limit: 10
//         }
//       }
//     }
//      try {
//       const analysisResults = await NLP.analyze(analyzeParams);
//       return res.status(200).send(analysisResults);
//      }
//      catch(err) {
//                   console.log(err);
//                   return res
//                     .status(400)
//                     .send(
//                       JSON.stringify({
//                         errorMessage: 'There was an error with Watson.',
//                         err: err
//                       })
//                     );
//                 }
//   }
//   else {
//     return res.status(400).send('No text was provided for analysis.')
//   }
// });

// exports.requestRelations = functions.https.onRequest(async (req, res) => {
//   const {text} = req.body;
//   if (text) {
//     const analyzeParams = {
//       text: text,
//       features: {
//         relations: {}
//       }
//     }
//      try {
//       const analysisResults = await NLP.analyze(analyzeParams);
//       return res.status(200).send(analysisResults);
//      }
//      catch(err) {
//                   console.log(err);
//                   return res
//                     .status(400)
//                     .send(
//                       JSON.stringify({
//                         errorMessage: 'There was an error with Watson.',
//                       })
//                     );
//                 }
//   }
//   else {
//     return res.status(400).send('No text was provided for analysis.')
//   }
// });

// exports.requestAll = functions.https.onRequest(async (req, res) => {
//   const {text} = req.body;
//   if (text) {
//     const analyzeParams = {
//       text: text,
//       features: {
//         relations: {},
//         keywords: {
//           sentiment: true,
//           emotion: true,
//           limit: 10
//         },
//         concepts: {
//           limit: 10
//         },
//         categories: {
//           limit: 5
//         },
//         entities: {
//           limit: 10
//         }
//       }
//     }
//      try {
//       const analysisResults = await NLP.analyze(analyzeParams);
//       return res.status(200).send(analysisResults);
//      }
//      catch(err) {
//                   console.log(err);
//                   return res
//                     .status(400)
//                     .send(
//                       JSON.stringify({
//                         errorMessage: 'There was an error with Watson.',
//                       })
//                     );
//                 }
//   }
//   else {
//     return res.status(400).send('No text was provided for analysis.')
//   }
// });

// const mammoth = require("mammoth");
// const fileType = require('file-type');
// const pdfjsLib = require('pdfjs-dist/build/pdf');

// exports.extractDocx = functions.https.onRequest(async (req, res) => {
//     const documentBuffer = new Buffer( req.body, 'base64' );
//   try {

//   return res.status(200).send('hola')
//   }
//   catch(err) {
//     return res.status(500).send({
//       err: err,
//       req: req
//     })
//   }
//   if (documentBuffer) {
//     if (fileType(documentBuffer).ext == 'docx' || fileType(documentBuffer).ext == 'zip' ) {
//       try {
//       const result = await mammoth.extractRawText({buffer: documentBuffer});
//       console.log(result)
//       return res.status(200).send({
//         text: result.value,
//         messages: result.messages
//         }
//       )
//       }
//       catch(err) {
//         return res.status(500).send(
//               {
//             error: 'There was a problem extracting text from a docx file.',
//             err: err
//           }
//           )

//       }
//     }
//     else {
//       return (res.status(400).send({
//         error: 'A file with an invalid file type was sent in the request. Only PDF and docx is allowed',
//         typeDetected: fileType(documentBuffer)
//       }))
//     }

//   }

//   else {
//     return (res.status(400).send({
//       error: 'No file was found in the request',
//       typeDetected: fileType(documentBuffer)
//     }))
//   }
// })

// exports.extractFile = functions.https.onRequest(async (req, res) => {
//   let documentString = req.body;
//   const documentBuffer = new Buffer( documentString, 'base64' );
//   console.log(fileType(documentBuffer).ext);
//   if (documentBuffer) {
//     if (fileType(documentBuffer).ext == 'pdf') {
//       try {
//         let finalString = '';
//         const pdf = await pdfjsLib.getDocument({data: documentBuffer});
//         const totalPages = await pdf._pdfInfo.numPages;
//         for (let i = 1; i <= totalPages; i++) {
//            const pdfPage = await pdf.getPage(i);
//            const textContent = await pdfPage.getTextContent();
//            console.log(textContent);
//            textContent.items.forEach(item => {
//              finalString += item.str + ' ';
//            })
//         }
//         finalString = finalString.replace(/\s+/g,' ').trim();
//         return res.status(200).send({text: finalString});
//       }
//       catch(err) {
//         return res.status(500).send({
//           error: 'There was a problem extracting text from a docx file.',
//           err: err
//         });
//       }
//     }
//     else if (fileType(documentBuffer).ext == 'docx' || fileType(documentBuffer).ext == 'zip' ) {
//       try {
//       const result = await mammoth.extractRawText({buffer: documentBuffer});
//       console.log(result)
//       return res.status(200).send({
//         text: result.value,
//         messages: result.messages
//         }
//       )
//       }
//       catch(err) {
//         return res.status(500).send(
//               {
//             error: 'There was a problem extracting text from a docx file.',
//             err: err
//           }
//           )

//       }
//     }
//     else {
//       return (res.status(400).send({
//         error: 'A file with an invalid file type was sent in the request. Only PDF and docx is allowed',
//         typeDetected: fileType(documentBuffer)
//       }))
//     }

//   }

//   else {
//     return (res.status(400).send({
//       error: 'No file was found in the request',
//       typeDetected: fileType(documentBuffer)
//     }))
//   }
// })

// exports.extractText = functions.https.onRequest(async (req, res) => {
// const doc = req.body;

// const postData = req.body;
// const options = {
//   host: 'https://us-south.functions.cloud.ibm.com/api/v1/web/lucianopinedo%40gmail.com_dev/default/extractFile',
//   port: 80,
//   method: 'POST',
//   headers: {
//   }
// };

// const request = http.request(options, (res) => {
//   console.log(res)

// });

// request.on('error', (e) => {
//   console.error(`problem with request: ${e.message}`);
// });
// request.write(postData);
// request.end();

// })
// let chrono = require('chrono-node');

// function formatDate(entryDate)  {
//   let date = entryDate.trim().toLowerCase();
//   date = date.replace(/\sde\s|\sdel\s/gm,' ')
//   if ( date.match(/ene\s|enero\s/gm) ) {
//     date = date.replace(/ene\s|enero\s/gm, 'January ');
//   }
//   else if (date.match(/feb\s|febrero\s/gm) ) {
//     date = date.replace(/feb\s|febrero\s/gm, 'February ');
//   }
//   else if (date.match(/mar\s|marzo\s/gm) ) {
//     date = date.replace(/mar\s|marzo\s/gm, 'March ');
//   }
//   else if (date.match(/abr|abril\s/gm)) {
//     date = date.replace(/abr|abril\s/gm, 'April ')
//   }
//   else if (date.match(/may\s|mayo\s/gm)) {
//     date = date.replace(/may\s|mayo\s/gm, 'May ');
//   }
//   else if(date.match(/jun\s|junio\s/gm)) {
//     date = date.replace( /jun\s|junio\s/gm, 'June ');
//   }
//   else if (date.match(/jul\s|julio\s/gm)) {
//     date = date.replace( /jul\s|julio\s/gm, 'July ');
//   }
//   else if (date.match(/ago\s|agosto\s/gm)) {
//     date = date.replace(/ago\s|agosto\s/gm, 'August ');
//   }
//   else if (date.match(/sep\s|septiembre\s|set\s|setiembre\s/gm)) {
//     date = date.replace(/sep\s|septiembre\s|set\s|setiembre\s/gm, 'September ');
//   }
//   else if (date.match(/oct\s|octubre\s/gm)) {
//     date = date.replace(/oct\s|octubre\s/gm, 'October ');
//   }
//   else if (date.match(/nov\s|noviembre\s/gm)) {
//     date = date.replace(/nov\s|noviembre\s/gm, 'November ');
//   }
//   else if (date.match(/dic\s|diciembre\s/gm)) {
//     date = date.replace(/dic\s|diciembre\s/gm, 'December ');
//   }
//   console.log(date);
//   return date;
// }
// exports.extractDate = functions.https.onRequest(async (req, res) => {
//   const date = req.body.date;
//   const parsedDate = chrono.parseDate(formatDate(date));
//   console.log(parsedDate)
//   return res.status(200).send({date: date, parsedDate: parsedDate, formatDate: formatDate(date)})


//   })
// const [firstName, setFirstName] = useState('')
//       const [lastName, setLastName] = useState('')
//       const [email, setEmail] = useState('');
//       const [codeInput, setCodeInput] = useState('')
//       const [telephoneInput, setTelephoneInput] = useState('')
//       const [telephones, setTelephones] = useState([]);
//       const [languageInput, setLanguageInput] = useState('');
//       const [languages, setLanguages] = useState([]);
//       const [previousWorkInput, setPreviousWorkInput] = useState('');
//       const [previousWorks, setPreviousWorks] = useState([]);
//       const [universityInput, setUniversityInput] = useState('');
//       const [universities, setUniversities] = useState([]);
//       const [workYears, setWorkYears] = useState(0);
//       const [age, setAge] = useState(null);
//       const [hasTitle, setHasTitle] = useState(false);
//       const [hasExperience, setHasExperience] = useState(false);
