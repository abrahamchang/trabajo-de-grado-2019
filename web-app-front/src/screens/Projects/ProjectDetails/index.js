import React, {useState, useEffect} from 'react'
import {CardTitle, CardSubtitle,  Card, Container, Row, Col, Table, Button, Collapse, Spinner} from 'reactstrap'
import AdvancedSearch from '../../../components/advancedSearch';
import {FaArrowUp, FaArrowDown, FaArrowRight, FaInfo} from 'react-icons/fa';
import {TiDocumentText} from 'react-icons/ti'
import {isNumber} from 'util';
import Firebase from '../../../firebase'
import Navbar from '../../../components/navbar';
export default function ProjectDetails(props) {
  const [candidatePool, setCandidatePool] = useState([]);
  const [potentialCandidates, setPotentialCandidates] = useState([]);
  const [rejectedCandidates, setRejectedCandidates] = useState([]);
  const [finalCandidates, setFinalCandidates] = useState([]);
  const [projectModified, setProjectModified] = useState(false);
  const [managementCollapse, setManagementCollapse] = useState(true);
  const [addCollapse, setAddCollapse] = useState(false);
  const [modifyCollapse, setModifyCollapse] = useState(false);
  const {name, startDateString, projectCriteria, id} = props.location.state
  const [loading, setLoading] = useState(true)


  function uploadChanges() {
    let changes = {...props.location.state, finalCandidates: finalCandidates, potentialCandidates: potentialCandidates, rejectedCandidates: rejectedCandidates}
    delete changes.startDate;
    delete changes.startDateString;
    console.log(changes)
    return Firebase.modifyProject(changes)
  }

  function checkAlreadyInProject(recievedArray, fc, pc, rc) {
    let candidatePoolCopy = recievedArray;
    pc.forEach(potentialCandidate => {
      candidatePoolCopy = candidatePoolCopy.filter(candidate => candidate.id !== potentialCandidate.id)
    })
    console.log(candidatePoolCopy)
    fc.forEach(rejectedCandidate => {
      candidatePoolCopy = candidatePoolCopy.filter(candidate => candidate.id !== rejectedCandidate.id)
    })
    rc.forEach(potentialCandidate => {
      candidatePoolCopy = candidatePoolCopy.filter(candidate => candidate.id !== potentialCandidate.id)
    })
    setPotentialCandidates(pc)
    setFinalCandidates(fc)
    setRejectedCandidates(rc)
    setCandidatePool(candidatePoolCopy)
  }
  useEffect( () => {
    //Initial data load
    async function getCandidatePool() {
    const url = 'https://us-central1-trabajo-de-grado-2019.cloudfunctions.net/advancedSearch'
    const postParams = {
      method: 'POST',
      headers: {
      },
      body: JSON.stringify(projectCriteria)
    }
    try {
      const searchResponse = await fetch(url, postParams)
      const searchResults = await searchResponse.json();
      const projectDoc = await Firebase.getProjectDocument(id)
      setPotentialCandidates(projectDoc.data().potentialCandidates)
      const {finalCandidates, potentialCandidates, rejectedCandidates} = projectDoc.data();
      checkAlreadyInProject(searchResults, finalCandidates, potentialCandidates, rejectedCandidates)
      setLoading(false)
    }
    catch(err) {
      console.log(err)
    }
  }
  getCandidatePool();
  //End of initial data load
  return () => {}
  }, [])
  function moveCandidate(removalIndex, removalArray, removalArraySetter, additionArray, additionArraySetter) {
    const newRemovalArray = removalArray.filter((item, i) => i !== removalIndex);
    const newAdditionArray = [...additionArray, removalArray[removalIndex]];
    removalArraySetter(newRemovalArray);
    additionArraySetter(newAdditionArray);
    setProjectModified(true)
  }
  function calculateMaxScore(searchEntry) {
    const values = Object.values(searchEntry);
    const reducer = (acc, curr) => { return isNumber(curr) ? acc + curr : acc }
    return values.reduce(reducer, 0)
  }

  function calculateScore(searchEntry) {
    const {languageFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
    workplacesFound} =searchEntry;
      const {languageWeight, previousWorksWeight, searchTermWeight, titlesWeight, universitiesWeight, workExperienceYearsWeight, workplacesWeight} = searchEntry;
    let totalScore = 0;
    if (languageFound) totalScore += languageWeight;
    if (previousWorksFound) totalScore += previousWorksWeight;
    if (searchTermFound) totalScore += searchTermWeight;
    if (titlesFound) totalScore += titlesWeight;
    if (universitiesFound) totalScore += universitiesWeight;
    if (workExperienceYearsFound) totalScore += workExperienceYearsWeight;
    if (workplacesFound) totalScore += workplacesWeight
    return totalScore
  }
  function parametersFound(searchEntry) {
    const {languageFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
      workplacesFound} = searchEntry;
      let parametersFound = '';
    if (languageFound) parametersFound += 'Idiomas, ';
    if (previousWorksFound) parametersFound += 'Trabajos previos, ';
    if (searchTermFound) parametersFound += 'Términos de búsqueda, ';
    if (titlesFound) parametersFound += 'Títulos, ';
    if (universitiesFound) parametersFound += 'Universidades, ';
    if (workExperienceYearsFound) parametersFound += 'Años de experiencia, ';
    if (workplacesFound) parametersFound += 'Empresas de referencía, '
    parametersFound = parametersFound.trim();

    return parametersFound.replace(/.$/,".")
  }

  function AddToProject() {
    return (<Card>
      <Row className="d-flex justify-content-between">
        <Col md={6}>
          <h4 className="text-center"> Candidatos Recomendados </h4>
          <Table >
            <thead>
              <tr>
          <th> Nombre completo </th>
              <th> Puntuación </th>
              <th> Det. </th>
              <th> Agregar </th>
              </tr>
              </thead>
              <tbody>
              {candidatePool.map((candidate, i) => (
          <tr key={candidate.id}>
            <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
            <td> {calculateScore(candidate)}/{calculateMaxScore(candidate)} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / calculateMaxScore(candidate) ): 0}%) </td>
            <td> <Button color="info" onClick={() => {props.navigate(`${candidate.curriculumData.discoveryId}`, {state: candidate})}}> <FaInfo/> </Button></td>
            <td> <Button color="primary" onClick={() => {moveCandidate(i, candidatePool, setCandidatePool, potentialCandidates, setPotentialCandidates)}}> <FaArrowRight/> </Button></td>
          </tr>
        ))}
        </tbody>
              </Table>
        </Col>
        <Col md={6}>
        <h4 className="text-center"> Candidatos Potenciales del Proyecto</h4>
        <Table >
          <thead>
            <tr>
        <th> Nombre completo </th>
              <th> Puntuación </th>
              <th> Det. </th>
              </tr>
              </thead>
              <tbody>
              {potentialCandidates.map(candidate => (
          <tr key={candidate.id}>
 <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
            <td> {calculateScore(candidate)}/{calculateMaxScore(candidate)} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / calculateMaxScore(candidate) ): 0}%) </td>
            <td> <Button color="info"> <FaInfo/> </Button></td>
          </tr>
        ))}
        </tbody>
              </Table>
        </Col>
      </Row>
    </Card>)
  }

  function PotentialTable() {
    return <Table>
      <thead>
        <tr>
        <th> Nombre Completo </th>
        <th> Puntuación</th>
        <th> Parámetros cumplidos</th>
        <th> Detalles </th>
        <th>  </th>
        <th>  </th>
        </tr>
        </thead>
        <tbody>
        {potentialCandidates.map((candidate, i) => (
          <tr key={candidate.id}>
 <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
            <td> {calculateScore(candidate)}/{calculateMaxScore(candidate)} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / calculateMaxScore(candidate) ): 0}%) </td>
            <td> {parametersFound(candidate)} </td>
            <td> <Button color="info" onClick={() => {props.navigate(`${candidate.curriculumData.discoveryId}`, {state: candidate})}}> <TiDocumentText size={24}/> </Button></td>
            <td> <Button color="primary" onClick={() => moveCandidate(i, potentialCandidates, setPotentialCandidates, finalCandidates, setFinalCandidates)}> <FaArrowUp/> Seleccionar </Button></td>
            <td> <Button onClick={() => moveCandidate(i, potentialCandidates, setPotentialCandidates, rejectedCandidates, setRejectedCandidates)}> <FaArrowDown /> Rechazar </Button></td>
          </tr>
        ))}
        </tbody>
    </Table>
  }

  function RejectedTable() {
    return <Table>
      <thead>
        <tr>
              <th> Nombre Completo </th>
        <th> Puntuación</th>
        <th> Parámetros cumplidos</th>
        <th> Ver detalles </th>
        <th> </th>
        <th>  </th>
        <th>  </th>
        </tr>
        </thead>
        {rejectedCandidates.map((candidate, i) => (
          <tr key={candidate.id}>
 <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
            <td> {calculateScore(candidate)}/{calculateMaxScore(candidate)} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / calculateMaxScore(candidate) ): 0}%) </td>
            <td> {parametersFound(candidate)} </td>
            <td> <Button color="info" onClick={() => {props.navigate(`${candidate.curriculumData.discoveryId}`, {state: candidate})}}> Ver detalles </Button></td>
            <td> <Button color="primary" onClick={() => moveCandidate(i, rejectedCandidates, setRejectedCandidates, potentialCandidates, setPotentialCandidates)}> <FaArrowUp/> </Button></td>
            <td> <Button color="danger"> Remover candidato </Button></td>
            <td></td>
          </tr>
        ))}
    </Table>
  }

  function FinalTable() {
    return (      <Table>
      <thead>
        <tr>
        <th> Nombre Completo </th>
        <th> Puntuación</th>
        <th> Parámetros cumplidos</th>
        <th> Ver detalles </th>
        <th>  </th>
        <th>  </th>
        </tr>
        </thead>
        {finalCandidates.map((candidate, i) => (
          <tr key={candidate.id}>
 <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
            <td> {calculateScore(candidate)}/{calculateMaxScore(candidate)} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / calculateMaxScore(candidate) ): 0}%) </td>
            <td> {parametersFound(candidate)} </td>
            <td> <Button color="info" onClick={() => {props.navigate(`${candidate.curriculumData.discoveryId}`, {state: candidate})}}> Ver detalles </Button></td>
            <td> <Button onClick={() => moveCandidate(i, finalCandidates, setFinalCandidates, potentialCandidates, setPotentialCandidates)}><FaArrowDown/></Button> </td>
          </tr>
        ))}
      </Table>)
  }

  function ProjectManagement() {
    return (<Card className="mt-2">
      <Container>
      <CardTitle> <h4> Candidatos Seleccionados </h4> </CardTitle>
      <FinalTable/>
      <CardTitle> <h4> Candidatos Potenciales </h4> </CardTitle>
      <PotentialTable/>
      <CardTitle> <h4> Candidatos Descartados </h4> </CardTitle>
      <RejectedTable/>
      </Container>
    </Card>)
  }
  return (
     <> <Navbar/>
     {loading ?  <Container> <Card md={8} className="d-flex justify-content-center align-items-center mb-2 mt-2"> <b className="mb-2"> Cargando proyecto </b><Spinner className="mb-2"/></Card> </Container> :  <Container className="mb-2 mt-2">
    <Row className="justify-content-center">
      <Col lg={12} className="d-flex flex-column">
        <Card>
          <CardTitle className="align-self-center"> <h3> {name} </h3>  </CardTitle>
          <CardSubtitle className="align-self-center"> <h6 className="text-muted"> Fecha de apertura: {startDateString} </h6></CardSubtitle>
        </Card>
        </Col>
        </Row>
        <Row>
          <Col lg={12} >

          <Card className="mb-2 mt-2">
            <Button block color="info" onClick={() => setManagementCollapse(!managementCollapse)}>Administrar Proyecto </Button>
            <Collapse isOpen={managementCollapse}>
            <ProjectManagement/>
            </Collapse>
          </Card>

          <Card className="mb-2 mt-2">
            <Button block color="secondary" onClick={() => setAddCollapse(!addCollapse)}>Agregar Candidatos </Button>
            <Collapse isOpen={addCollapse}>
            <AddToProject/>
            </Collapse>
          </Card>
          <Card className="mb-2 mt-2">
            <Button block color="secondary" onClick={() => {setModifyCollapse(!modifyCollapse)}}> Cambiar criterios del proyecto </Button>
            <Collapse isOpen={modifyCollapse}>
            <AdvancedSearch searchParams={projectCriteria}/>
            </Collapse>
          </Card>
          <Button block onClick= {() => uploadChanges()} color="success"> Guardar Cambios</Button>
          <Button block onClick= {() => {}} color="danger"> Cerrar Proyecto </Button>
          </Col>
        </Row>
        </Container>}
        </>
  )
}
