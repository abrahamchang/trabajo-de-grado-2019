import React, {useState, useEffect} from 'react'
import {CardTitle, CardSubtitle,  Card, Container, Row, Col, Table, Button} from 'reactstrap'
import AdvancedSearch from '../../../components/advancedSearch';
import {FaArrowUp, FaArrowDown, FaArrowRight, FaInfo} from 'react-icons/fa';
import {isNumber} from 'util';
export default function ProjectDetails(props) {
  const [candidatePool, setCandidatePool] = useState([])
  const [potentialCandidates, setPotentialCandidates] = useState([])
  const [rejectedCandidates, setRejectedCandidates] = useState([])
  const [finalCandidates, setFinalCandidates] = useState([])
  const {name, startDateString, projectCriteria} = props.location.state


  const test = [{id: 'a'},{id: 'b'}, {id: 'c'} ]

  useEffect( () => {
    async function getCandidatePool() {
    console.log(projectCriteria)
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
      console.log(searchResults)
      setCandidatePool(searchResults)
    }
    catch(err) {
      console.log(err)
    }
  }
  getCandidatePool();
  }, [])
  function moveCandidate(removalIndex, removalArray, removalArraySetter, additionArray, additionArraySetter) {
    const newRemovalArray = removalArray.filter((item, i) => i !== removalIndex);
    const newAdditionArray = [...additionArray, removalArray[removalIndex]];
    removalArraySetter(newRemovalArray);
    additionArraySetter(newAdditionArray);
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
            <td> <Button color="info"> <FaInfo/> </Button></td>
            <td> <Button color="primary" onClick={() => {moveCandidate()}}> <FaArrowRight/> </Button></td>
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
              {test.map(candidate => (
          <tr key={candidate.id}>
            <td> Hola cocacola</td>
            <td> 10/10</td>
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
        <th> Ver detalles </th>
        <th>  </th>
        <th>  </th>
        </tr>
        </thead>
        <tbody>
        {test.map(candidate => (
          <tr key={candidate.id}>
            <td> Hola cocacola</td>
            <td> 10/10</td>
            <td> Todos </td>
            <td> <Button color="info"> Ver detalles </Button></td>
            <td> <Button color="primary"> <FaArrowUp/> </Button></td>
            <td> <Button> <FaArrowDown/></Button></td>
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
        <th>  </th>
        <th>  </th>
        </tr>
        </thead>
        {test.map(candidate => (
          <tr key={candidate.id}>
            <td> Hola cocacola</td>
            <td> 10/10</td>
            <td> Todos </td>
            <td> <Button color="info"> Ver detalles </Button></td>
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
        {test.map(candidate => (
          <tr key={candidate.id}>
            <td> Hola cocacola</td>
            <td> 10/10</td>
            <td> Todos </td>
            <td> <Button color="info"> Ver detalles </Button></td>
            <td> <Button><FaArrowDown/></Button> </td>
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
    <Container className="mb-2 mt-2">
    <Row className="justify-content-center">
      <Col lg={12} className="d-flex flex-column">
        <Card>
          <CardTitle className="align-self-center"> <h3> {name} </h3>  </CardTitle>
          <CardSubtitle className="align-self-center"> <h6 className="text-muted"> Fecha de apertura: {startDateString} </h6></CardSubtitle>
          <AdvancedSearch searchParams={projectCriteria}/>
        </Card>
        </Col>
        </Row>
        <Row>
          <Col lg={12} >
            <AddToProject/>
          </Col>
        </Row>
        </Container>
  )
}
