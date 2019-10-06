const mammoth = require("mammoth");
const fileType = require('file-type');
const pdfjs = require('pdfjs-dist/build/pdf')


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
        return ({
          statusCode: 200,
          body: {
          text: finalString,
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
      return ({
        statusCode: 200,
        body: {
        text: result.value,
        messages: result.messages
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