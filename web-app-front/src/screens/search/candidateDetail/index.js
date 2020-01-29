import React, {useState} from 'react'

import { Container, Row, Col, Button } from 'reactstrap';
import UploadForm from '../../../components/uploadForm';
import Firebase from '../../../firebase'
export default function CandidateDetail(props) {
  const [loading, setLoading] = useState(true)
  const [candidateData, setCandidateData] = useState({})

  async function downloadDocument() {
    let url = await Firebase.retrieveFileURL(candidateData.storageRef);

    fetch(url)
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = candidateData.storageRef.split('/')[2];
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => alert('Error descargando el archivo'));
  }

  async function fetchCandidateData() {
    console.log(props)
    const queryResult = await Firebase.getCurriculumByDiscoveryId(props.discoveryId);
    let queryDoc = {...queryResult.docs[0].data()};
    queryDoc.birthDate = queryDoc.birthDate.toDate();
    queryDoc.educationExperience.forEach(education => {
      education.startDate =  education.startDate ? education.startDate.toDate() : '';
      education.endDate = education.endDate ? education.endDate.toDate() : '';
    })
    queryDoc.workExperience.forEach(work => {
      work.startDate = work.startDate ? work.startDate.toDate() : '';
      work.endDate = work.endDate ?work.endDate.toDate() : '';
    })
    setLoading(false)
    setCandidateData({...queryDoc, update: true})
  }

  function mapCurriculumData(candidateData) {
    let curriculumData = {...candidateData};
    curriculumData.birthDate = curriculumData.birthDate.toDate();
    curriculumData.educationExperience.forEach(education => {
      education.startDate = education.startDate.toDate();
      education.endDate = education.endDate.toDate();
    })
    curriculumData.workExperience.forEach(work => {
      work.startDate = work.startDate.toDate();
      work.endDate = work.endDate.toDate();
    })
    setLoading(false)
    setCandidateData({...curriculumData, update: true})
  }



  loading && (props.curriculumData ? mapCurriculumData(props.curriculumData) : fetchCandidateData());

  function displayOptions() {
    return (
      <Row className="justify-content-center">
        <Col className="d-flex flex-column" lg={8}>
            <Row className="justify-content-around">
            <Button className="mb-1 mt-1" color="success" onClick={downloadDocument}> Descargar Curriculum </Button>
            <Button className="mb-1 mt-1" color="info" disabled> Agregar a Proyecto (En progreso) </Button>
            </Row>
        </Col>
      </Row>
    );
  }

  return (
    <Container>
    <Row className="justify-content-center">
      <Col lg={8} className="d-flex flex-column">
        <UploadForm readOnly {...candidateData}/>
        </Col>
        </Row>
        {displayOptions()}
        </Container>
  )
}


