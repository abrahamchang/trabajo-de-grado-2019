import React, {useState} from 'react'

import { Container, Row, Col, Card, Spinner } from 'reactstrap';
import UploadForm from '../../../components/uploadForm';
import Firebase from '../../../firebase'
export default function CandidateDetail(props) {
  const [loading, setLoading] = useState(true)
  const [candidateData, setCandidateData] = useState({})
  async function fetchCandidateData() {
    const queryResult = await Firebase.getCurriculumByDiscoveryId(props.discoveryId);
    let queryDoc = {...queryResult.docs[0].data()};
    queryDoc.birthDate = queryDoc.birthDate.toDate();
    queryDoc.educationExperience.forEach(education => {
      education.startDate = education.startDate.toDate();
      education.endDate = education.endDate.toDate();
    })
    queryDoc.workExperience.forEach(work => {
      work.startDate = work.startDate.toDate();
      work.endDate = work.endDate.toDate();
    })
    console.log(queryDoc)
    setLoading(false)
    setCandidateData({...queryDoc, update: true})
  }

  loading && fetchCandidateData();



  return (
    <Container>
      <Row className="justify-content-center">
        <Col  className="d-flex flex-column"lg={8}>
          <Card> <p> hola </p> </Card>
        </Col>
      </Row>
    <Row className="justify-content-center">
      <Col lg={8} className="d-flex flex-column">
        <UploadForm readOnly {...candidateData}/>
        </Col>
        </Row>
        </Container>
  )
}


