import React, { useState, useCallback } from 'react';
import Moment from 'moment'
import { Container, Row, Col, Card, CardBody, CardTitle, Spinner } from 'reactstrap';

import { useDropzone } from 'react-dropzone';
import Navbar from '../../components/navbar';
import FileUploadIcon from './icons/FileUpload.svg';

import Firebase from '../../firebase';
import firebase from 'firebase/app';

import Resume from './resume';

import s from './dashboard.module.scss';

import UploadForm from '../../components/uploadForm'

const Dashboard = () => {
  const [fileComponents, setFileComponents] = useState([]);
  const [curriculumsInformation, setCurriculumsInformation] = useState([])
  const [files, setFiles] = useState([])
  const [storedB64, setB64] = useState(null);

  //Loading vars
  const [loadingAnalysis, setLoadingAnalysis] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [loadingDiscovery, setLoadingDiscovery] = useState(false)
  const onDrop = useCallback((acceptedFiles) => {
    const fileRequests = [];
    setFirstLoad(false)
    setLoadingAnalysis(true)
    acceptedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        let b64 = reader.result.replace(/^data:.+;base64,/, '');
        index === 0 && setB64(b64);
        const url = 'https://us-south.functions.cloud.ibm.com/api/v1/web/lucianopinedo%40gmail.com_dev/default/curriculumAnalysis'
        const postParams = {
          method: 'POST',
          body: b64,
        }
        try {
          const analysisResponse = await fetch(url, postParams);
          const data = await analysisResponse.json();
          fileRequests.push(data)
          index + 1 === acceptedFiles.length && console.log(fileRequests);
          index + 1 === acceptedFiles.length && organizeData(fileRequests);
          index + 1 === acceptedFiles.length && setLoadingAnalysis(false);
        } catch (err) {
          console.log(err)
        }
      }
      //Enviar a Watson
      reader.readAsDataURL(file);

    });
    setFiles(acceptedFiles);

  }, []);
  const uploadDocumentStorage = () => {
    setFileComponents(files.map((file, index) => {
      const uploadTask = Firebase.uploadFile(file);
      return <Resume key={`resumes-${index}`} uploadTask={uploadTask} file={file} />
    }))
  }



  const uploadDocumentData = async (curriculumData) => {
    const url = `https://us-south.functions.cloud.ibm.com/api/v1/web/lucianopinedo%40gmail.com_dev/default/uploadDocumentDiscovery?firstName=${curriculumData.firstName}&lastName=${curriculumData.lastName}&fileName=${files[0].name}`
    const postParams = {
      method: 'POST',
      body: storedB64,
    }
    try {
      setLoadingDiscovery(true);
      const uploadResponse = await fetch(url, postParams);
      const uploadJson = await uploadResponse.json();
      console.log(uploadJson);
      setLoadingDiscovery(false);
      setLoadingUpload(true);
      const curriculumDocument = { ...curriculumData, discoveryId: uploadJson.document_id, storageRef: `/resumes/${files[0].name}` }
      await Firebase.uploadCurriculum(curriculumDocument);
      uploadDocumentStorage();
      setLoadingUpload(false);

    }
    catch (err) {
      console.log(err)
    }
  }

  const organizeData = (curriculums) => {
    let extractedData = [];
    curriculums.forEach(curriculum => {
      let result = {
        //Personal data
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        telephones: [],
        //Residence data
        municipality: '',
        city: '',
        state: '',
        //Skills data:
        languages: [],
        skills: [],
        concepts: [],
        keywords: [],
        categories: [],
        //Education data
        educationExperience: [],
        courses: [],
        //Work data
        workExperience: [],
        age: '',
        // workExperienceYears: 0,
      }
      const { entities, relations } = curriculum.analysisResult;
      entities.forEach(entity => {
        const { type, confidence, text } = entity
        if (confidence > 0.5) {
          //Personal data extraction
          if (type === 'personFirstName' && !result.firstName) {
            result.firstName = text
          }
          else if (type === 'fullName' && !result.firstName && !result.lastName) {
            const wordArray = text.split(" ")
            if (wordArray.size === 4) {
              result.firstName = wordArray[0] + wordArray[1]
              result.lastName = wordArray[2] + wordArray[3]
            }
            else if (wordArray.size === 3) {
              result.firstName = wordArray[0] + wordArray[1]
              result.lastName = wordArray[2]
            }
            else {
              result.firstName = wordArray[0]
              result.lastName = wordArray[1]
            }
          }
          else if (type === 'age') {
            const age =  parseInt(text.replace( /^\D+/g, ''), 10);
            const currentDate = new Date();
            let ageDate = Moment(currentDate.getFullYear() - age, 'YYYY')
            console.log(age)
            console.log(ageDate)
            console.log(result.birthDate)
            console.log(ageDate.isSame(result.birthDate, 'year'))
            if (ageDate.isBefore(result.birthDate) || !result.birthDate) {
              if (!ageDate.isSame(result.birthDate, 'year')) {
                console.log('Extracted birthDate through age')
                result.ageFlag = true;
                result.birthDate = ageDate.toDate();
              }
            }
            result.age = age;
          }
          else if (type === 'personLastName' && !result.lastName) {
            result.lastName = text;
          }
          else if (type === 'email' && !result.email) {
            result.email = text;
          }
          else if (type === 'telephone') {
            const telephones = text.split('/');
            telephones.forEach(telephone => {
              const formattedTelephone = telephone.replace(/[^\d]/g, '');
              if (formattedTelephone.length >= 11) result.telephones.push(formattedTelephone);
            })
          }
          else if (type === 'municipality' && !result.municipality) {
            result.municipality = text;
          }
          else if (type === 'city' && !result.city) {
            result.city = text;
          }
          else if (type === 'state' && !result.state) {
            result.state = text;
          }
          else if (type === 'date') {
            let momentDate = Moment(text, 'DD/MM/YYYY')
            if (momentDate.isValid()) {
              result.birthDate = !result.birthDate ? momentDate.toDate() : momentDate.isBefore(result.birthDate) ? momentDate.toDate() : result.birthDate;
            }
            else {
              momentDate = Moment(text, 'DD/MM/YY');
              if (momentDate.isValid()){
              result.birthDate = !result.birthDate ? momentDate.toDate() : momentDate.isBefore(result.birthDate) ? momentDate.toDate() : result.birthDate;
              }
            }
          }
          //Skills data
          else if (type === 'languague') {
            console.log('Found a language')
            result.languages.push(text)
          }
          else if (type === 'skill') {
            result.skills.push(text)
          }
        }
      })
      relations.forEach(relation => {
        const { type, arguments: relationArguments } = relation
        //Work experience extraction (Must know date)
        //Education experience extraction
        if (type === 'graduated_as') {
          const educationInstitution = relationArguments[0].text;
          const educationTitle = relationArguments[1].text;
          let studyRange = null;
          let studyDates = null;
          const { location } = relationArguments[0]
          const institutionTextStart = location[0]
          //const institutionTextEnd = location[1]
          //Try to find date
          relations.forEach(relation => {
            const { type, arguments: relationArguments } = relation
            const { location } = relationArguments[0]
            if (type === 'studied_range') {
              const studyRangeFound = relationArguments[1].text;
              //Assure it's the same location in the text
              if (location[0] === institutionTextStart) {
                studyRange = studyRangeFound;
                studyDates = relation.dates;
              }
            }
          })
          //Create object and push
          const educationExperience = {
            educationInstitution: educationInstitution,
            educationTitle: educationTitle,
            studyRange: studyRange,
            startDate: studyDates ? new Date(studyDates[0]) : null,
            endDate: studyDates ? new Date(studyDates[1]) : null
          }
          result.educationExperience.push(educationExperience)
        }
        else if (type === 'worked_range') {
          const workplace = relationArguments[0].text;
          const workRange = relationArguments[1].text;
          const workplaceTextStart = relationArguments[0].location[0];
          //const workplaceTextEnd = relationArguments[1].location[1];
          const workDates = relation.dates;
          let workPosition = null;
          let workSpecialization = null;
          //Try to find work position
          relations.forEach(relation => {
            const { type, arguments: relationArguments } = relation
            if (type === 'worked_as') {
              const foundWorkPosition = relationArguments[1];
              const workplaceTextLocation = relationArguments[0].location;
              if (workplaceTextLocation[0] === workplaceTextStart) {
                workPosition = foundWorkPosition.text;
                const workPositionTextStart = foundWorkPosition.location[0];
                //const workPositionTextEnd = foundWorkPosition.location[1];
                //Attemp to find specialization
                relations.forEach(relation => {
                  const { type, arguments: relationArguments } = relation;
                  if (type === 'specialized_in') {
                    const foundWorkPosition = relationArguments[0]
                    if (foundWorkPosition.location[0] === workPositionTextStart) {
                      workSpecialization = relationArguments[1].text;
                    }
                  }
                })
              }
            }
          })
          const workExperience = {
            workplace: workplace,
            workRange: workRange,
            workPosition: workPosition,
            workSpecialization: workSpecialization,
            startDate: workDates ? new Date(workDates[0]) : null,
            endDate: workDates ? new Date(workDates[1]) : null
          }
          result.workExperience.push(workExperience)
        }
      })
      const { keywords, concepts, categories } = curriculum.analysisResult;
      result.keywords = keywords ? keywords.map(keyword => keyword.text) : null;
      result.concepts = concepts ? concepts.map(concept => concept.text) : null;
      result.categories = categories ? categories.map(category => category.label) : null;
      //Duplicate removal
      result.languages = [...new Set(result.languages)]
      result.skills = [...new Set(result.skills)]
      //End of duplicate removal
      extractedData.push(result)
    })
    console.log(extractedData)
    setCurriculumsInformation(extractedData)
  }



  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop });

  return (
    <div className={s.root}>
      <Navbar />
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="d-flex flex-column">
            <Card className="my-lg-5 my-md-4 my-3">
              <CardBody>
                <CardTitle className="text-center">
                  <h3>Cargar Currículos</h3>
                </CardTitle>
                <hr />
                <div
                  {...getRootProps({
                    className: `
                                    ${s.dropzone}
                                    ${isDragActive && s.dropzoneActive}
                                    ${isDragAccept && s.dropzoneAccept}
                                    ${isDragReject && s.dropzoneReject}
                                    `
                  })}
                >
                  <input {...getInputProps()} />
                  {loadingAnalysis ? (
                    <Spinner className={s.uploadIcon} />
                  ) : (
                      <img
                        className={s.uploadIcon}
                        src={FileUploadIcon}
                        alt="File upload icon."
                      />
                    )}
                  <h5>Arrastre los documentos aquí o Haga clic.</h5>
                  <p className="h6">Solo formatos PDF o DOC.</p>
                </div>
              </CardBody>
            </Card>
            <div
              className={firstLoad || loadingAnalysis ? `${s.hidden}` : null}
            >
              {UploadForm(
                curriculumsInformation[0]
                  ? {
                    ...curriculumsInformation[0],
                    update: true,
                    onSubmit: uploadDocumentData
                  }
                  : { update: false }
              )}
            </div>
            {fileComponents.length > 0 && (
              <Card>
                <CardBody>
                  {/* <CardTitle className="text-center">
                      <h3>Vista Previa</h3>
                    </CardTitle>
                    <hr /> */}
                  <Container>{fileComponents}</Container>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
        {loadingUpload
          ? fileComponents.map(fileComponent => fileComponent)
          : null}
        {loadingDiscovery ? (
          <Row className="justify-content-center">
            <Col className="d-flex flex-column" lg={8} >
              <Card >
                <Col className="d-flex flex-column justify-content-center align-items-center">
                  <CardTitle> <h3> Cargando Discovery </h3></CardTitle>
                  <Spinner />
                </Col>
              </Card>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
};

export default Dashboard;