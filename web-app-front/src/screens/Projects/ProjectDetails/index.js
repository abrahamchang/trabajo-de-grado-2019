import React, {useState, useEffect} from 'react'
import {CardTitle, CardSubtitle,  Card, Container, Row, Col, Table, Button, Collapse, Spinner} from 'reactstrap'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import AdvancedSearch from '../../../components/advancedSearch';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import {TiDocumentText} from 'react-icons/ti'

import Firebase from '../../../firebase'
// import Navbar from '../../../components/navbar';


export default function ProjectDetails(props) {
  const readOnly = !!props.location.state.readOnly
  const [candidatePool, setCandidatePool] = useState([]);
  const [potentialCandidates, setPotentialCandidates] = useState([]);
  const [rejectedCandidates, setRejectedCandidates] = useState([]);
  const [finalCandidates, setFinalCandidates] = useState([]);
  const [projectModified, setProjectModified] = useState(false);
  const [managementCollapse, setManagementCollapse] = useState(true);
  const [addCollapse, setAddCollapse] = useState(false);
  const [modifyCollapse, setModifyCollapse] = useState(false);
  const {name, startDateString, id} = props.location.state
  const [loading, setLoading] = useState(true)
  const [projectCriteria, setProjectCriteria] = useState({})
  const [modal, setModal] = useState(false);
  const [loadingClosure, setLoadingClosure] = useState(false)
  const [maxScore, setMaxScore] = useState(0)
  const [criteriaChange, setCriteriaChange] = useState(false)

  function uploadChanges() {
    let changes = {...props.location.state, finalCandidates: finalCandidates, potentialCandidates: potentialCandidates, rejectedCandidates: rejectedCandidates}
    delete changes.startDate;
    delete changes.startDateString;
    console.log(changes)
    return Firebase.modifyProject(changes)
  }
  async function modifySearchParams(searchParams) {
    let changes = {...props.location.state, finalCandidates: finalCandidates, potentialCandidates: potentialCandidates, rejectedCandidates: rejectedCandidates, projectCriteria: searchParams}
    delete changes.startDate;
    delete changes.startDateString;
    console.log(changes)
    setCriteriaChange(true)
    await Firebase.modifyProject(changes);
    setCriteriaChange(false)
    return window.location.reload();
  }
  function removeRejectedCandidate(index) {
  let candidatePoolCopy = [...candidatePool]
  //lazy
  candidatePoolCopy.push(  rejectedCandidates[index])
  candidatePoolCopy.sort((a,b) => (calculateScore(b) - calculateScore(a)))
setRejectedCandidates(rejectedCandidates.filter((item, i) => i !== index ))
setCandidatePool(candidatePoolCopy)
  }
  async function checkAlreadyInProject(recievedArray, fc, pc, rc) {

    let candidatePoolCopy = recievedArray;
    let pcFinal = pc.map(potentialCandidate => {
      let candidateUpdated;
      candidatePoolCopy.forEach(candidate => {
        if (candidate.id === potentialCandidate.id) {
          candidateUpdated = candidate;
        }
      })
      return candidateUpdated;
    })
    let fcFinal = fc.map(potentialCandidate => {
      let candidateUpdated;
      candidatePoolCopy.forEach(candidate => {
        if (candidate.id === potentialCandidate.id) {
          candidateUpdated = candidate;
        }
      })
      return candidateUpdated;
    })
    let rcFinal = rc.map(potentialCandidate => {
      let candidateUpdated;
      candidatePoolCopy.forEach(candidate => {
        if (candidate.id === potentialCandidate.id) {
          candidateUpdated = candidate;
        }
      })
      return candidateUpdated;
    })
    pcFinal = pcFinal.filter(candidate => candidate !== undefined)
    fcFinal = fcFinal.filter(candidate => candidate !== undefined)
    rcFinal = rcFinal.filter(candidate => candidate !== undefined)
    pcFinal.forEach(potentialCandidate => {
      candidatePoolCopy = candidatePoolCopy.filter(candidate => candidate.id !== potentialCandidate.id)
    })

    fcFinal.forEach(rejectedCandidate => {
      candidatePoolCopy = candidatePoolCopy.filter(candidate => candidate.id !== rejectedCandidate.id)
    })
    rcFinal.forEach(potentialCandidate => {
      candidatePoolCopy = candidatePoolCopy.filter(candidate => candidate.id !== potentialCandidate.id)
    })

    setPotentialCandidates(pcFinal)
    setFinalCandidates(fcFinal)
    setRejectedCandidates(rcFinal)
    setCandidatePool(candidatePoolCopy)


  }
  useEffect( () => {

    //Initial data load
    async function getCandidatePool() {
    const url = 'https://us-central1-trabajo-de-grado-2019.cloudfunctions.net/advancedSearch'
    try {
      const projectDoc = await Firebase.getProjectDocument(id)
      const postParams = {
        method: 'POST',
        headers: {
        },
        body: JSON.stringify(projectDoc.data().projectCriteria)
      }
      const searchResponse = await fetch(url, postParams)
      const searchResults = await searchResponse.json();
      console.log(searchResults)
      searchResults.sort((a,b) => (calculateScore(b) - calculateScore(a)))

      const {finalCandidates, potentialCandidates, rejectedCandidates} = projectDoc.data();
      checkAlreadyInProject(searchResults, finalCandidates, potentialCandidates, rejectedCandidates)
      setProjectCriteria(projectDoc.data().projectCriteria)
      setMaxScore(projectDoc.data().projectCriteria.totalParams)
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
  async function closeProject(status) {
    let changes = {...props.location.state, finalCandidates: finalCandidates, potentialCandidates: potentialCandidates, rejectedCandidates: rejectedCandidates}
    delete changes.startDate;
    delete changes.startDateString;
    setLoadingClosure(true)
    try {
    await Firebase.closeProject(changes, status);
    props.navigate('../')
    }
    catch(err) {
      console.log(err)
    }

  }

  async function moveCandidate(removalIndex, removalArray, removalArraySetter, additionArray, additionArraySetter) {
    let newRemovalArray = removalArray.filter((item, i) => i !== removalIndex);
    let newAdditionArray = [...additionArray, removalArray[removalIndex]];
    newRemovalArray.sort((a,b) => (calculateScore(b) - calculateScore(a)))
    newAdditionArray.sort((a,b) => (calculateScore(b) - calculateScore(a)))
    removalArraySetter(newRemovalArray);
    additionArraySetter(newAdditionArray);
    setProjectModified(true)

    // await uploadChanges()


  }
  // function calculateMaxScore(searchEntry) {
  //   const values = Object.values(searchEntry);
  //   const reducer = (acc, curr) => { return isNumber(curr) ? acc + curr : acc }
  //   return values.reduce(reducer, 0)
  // }

  // function calculateScore(searchEntry) {
  //   const {languageFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
  //   workplacesFound} =searchEntry;
  //     const {languageWeight, previousWorksWeight, searchTermWeight, titlesWeight, universitiesWeight, workExperienceYearsWeight, workplacesWeight} = searchEntry;
  //   let totalScore = 0;
  //   if (languageFound) totalScore += languageWeight;
  //   if (previousWorksFound) totalScore += previousWorksWeight;
  //   if (searchTermFound) totalScore += searchTermWeight;
  //   if (titlesFound) totalScore += titlesWeight;
  //   if (universitiesFound) totalScore += universitiesWeight;
  //   if (workExperienceYearsFound) totalScore += workExperienceYearsWeight;
  //   if (workplacesFound) totalScore += workplacesWeight
  //   return totalScore
  // }
  // function parametersFound(searchEntry) {
  //   const {languageFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
  //     workplacesFound} = searchEntry;
  //     let parametersFound = '';
  //   if (languageFound) parametersFound += 'Idiomas, ';
  //   if (previousWorksFound) parametersFound += 'Trabajos previos, ';
  //   if (searchTermFound) parametersFound += 'Términos de búsqueda, ';
  //   if (titlesFound) parametersFound += 'Títulos, ';
  //   if (universitiesFound) parametersFound += 'Universidades, ';
  //   if (workExperienceYearsFound) parametersFound += 'Años de experiencia, ';
  //   if (workplacesFound) parametersFound += 'Empresas de referencía, '
  //   parametersFound = parametersFound.trim();

  //   return parametersFound.replace(/.$/,".")
  // }
  function calculateScore(searchEntry) {
    const {languagesFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
    workplacesFound, skillsFound, citiesFound} =searchEntry;
      // const {languageWeight, previousWorksWeight, searchTermWeight, titlesWeight, universitiesWeight, workExperienceYearsWeight, workplacesWeight,skillsWeight} = searchEntry;
      const {workExperienceYearsWeight} = searchEntry;
      const {totalLanguages, totalPreviousWorks, totalSearchTerm, totalTitles, totalUniversities, totalWorkplaces, totalSkills, totalCities} = searchEntry;
    let totalScore = 0;
    if (languagesFound) totalScore += totalLanguages;
    if (previousWorksFound) totalScore += totalPreviousWorks;
    if (searchTermFound) totalScore += totalSearchTerm;
    if (titlesFound) totalScore += totalTitles;
    if (universitiesFound) totalScore += totalUniversities;
    if (workExperienceYearsFound) totalScore += workExperienceYearsWeight;
    if (workplacesFound) totalScore += totalWorkplaces;
      if (skillsFound) totalScore += totalSkills;
      if (citiesFound) totalScore += totalCities;
    return totalScore
  }
  function parametersFound(searchEntry) {
    const {languagesFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
      workplacesFound, skillsFound, citiesFound} = searchEntry;
      const {totalLanguages, totalPreviousWorks, totalSearchTerm, totalTitles, totalUniversities, totalWorkplaces, totalSkills, totalCities} = searchEntry;
      let parametersFound = '';
    if (languagesFound) parametersFound += `Idiomas (${totalLanguages}), `;
    if (previousWorksFound) parametersFound += `Trabajos previos (${totalPreviousWorks}), `;
    if (searchTermFound) parametersFound += `Términos de búsqueda (${totalSearchTerm}), `;
    if (titlesFound) parametersFound += `Títulos (${totalTitles}), `;
    if (universitiesFound) parametersFound += `Universidades (${totalUniversities}), `;
    if (workExperienceYearsFound) parametersFound += `Años de experiencia, `;
    if (workplacesFound) parametersFound += `Empresas de referencía (${totalWorkplaces}), `;
    if (skillsFound) parametersFound += `Habilidades (${totalSkills}), `
    if (citiesFound) parametersFound += `Ciudad (${totalCities}), `
    parametersFound = parametersFound.trim();

    return parametersFound.replace(/.$/,".")
  }
  function CloseProjectModal() {
    const toggle = () => setModal(!modal);

    return (
      <div>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Culminar Proyecto</ModalHeader>

          <ModalBody>
            {!loadingClosure && (finalCandidates.length > 0 ? `¿Desea culminar este proceso de selección? Los candidatos seleccionados: ${finalCandidates.map(candidate => ` ${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`)} seran almacenados como escogidos para el cargo.` : `¿Está seguro que desea culminar el proyecto sin escoger ningún candidato? El proyecto sera almacenado como "Clausurado".`) }
            {loadingClosure && <Container className="d-flex flex-column justify-content-center align-items-center mb-2 mt-2"> <Spinner/> Cerrando Proyecto </Container>}
          </ModalBody>
          <ModalFooter>
      {     !loadingClosure && <>
            <Button color="primary" onClick={() => closeProject(finalCandidates.length > 0 ? 'Culminado' : 'Clausurado')}>Culminar proyecto</Button>
            <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </>
            }
          </ModalFooter>
        </Modal>
      </div>
    );
  }


  function AddToProject() {



    if (candidatePool && candidatePool.length !== 0) {
        return (
          <Table>
            <thead>
              <tr>
                <th> Nombre </th>
                <th> Apellido </th>
                <th> Puntuación </th>
                <th> Parámetros cumplidos </th>
                <th></th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {candidatePool.map((candidate, i) =>
               {const {firstName, lastName} = candidate.curriculumData;

                 return (<tr key={candidate.id}>
                  <td> {firstName} </td>
                  <td> {lastName} </td>
                  <td> {calculateScore(candidate)}/{maxScore} ({(calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / maxScore ): 0).toFixed(2)}%)  </td>
                  <td> {parametersFound(candidate)} </td>
                  <td>
                    <Button color="primary" onClick={() => props.navigate(`${candidate.curriculumData.discoveryId}`, {state: candidate})}> Ver más </Button>
                  </td>
                  <td>
                    <Button color="primary" onClick={() => {moveCandidate(i, candidatePool, setCandidatePool, potentialCandidates, setPotentialCandidates)}}> Agregar </Button>
                  </td>
                </tr>)}
              )}
            </tbody>
          </Table>
        );
              }
              else {
                  return (
                      <p> La búsqueda no tuvo resultados. </p>
                  )
              }
//     return (<Card>
//       <Row className="d-flex justify-content-between">
//         <Col md={6}>
//           <h4 className="text-center"> Candidatos Recomendados </h4>
//           <Table >
//             <thead>
//               <tr>
//           <th> Nombre completo </th>
//               <th> Puntuación </th>
//               <th> Det. </th>
//               <th> Agregar </th>
//               </tr>
//               </thead>
//               <tbody>
//               {candidatePool.map((candidate, i) => (
//           <tr key={candidate.id}>
//             <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
//             <td> {calculateScore(candidate)}/{calculateMaxScore(candidate)} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / calculateMaxScore(candidate) ): 0}%) </td>
//             <td> <Button color="info" onClick={() => {props.navigate(`${candidate.curriculumData.discoveryId}`, {state: candidate})}}> <FaInfo/> </Button></td>
//             <td> <Button color="primary" onClick={() => {moveCandidate(i, candidatePool, setCandidatePool, potentialCandidates, setPotentialCandidates)}}> <FaArrowRight/> </Button></td>
//           </tr>
//         ))}
//         </tbody>
//               </Table>
//         </Col>
//         <Col md={6}>
//         <h4 className="text-center"> Candidatos Potenciales del Proyecto</h4>
//         <Table >
//           <thead>
//             <tr>
//         <th> Nombre completo </th>
//               <th> Puntuación </th>
//               <th> Det. </th>
//               </tr>
//               </thead>
//               <tbody>
//               {potentialCandidates.map(candidate => (
//           <tr key={candidate.id}>
//  <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
//             <td> {calculateScore(candidate)}/{calculateMaxScore(candidate)} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / calculateMaxScore(candidate) ): 0}%) </td>
//             <td> <Button color="info"> <FaInfo/> </Button></td>
//           </tr>
//         ))}
//         </tbody>
//               </Table>
//         </Col>
//       </Row>
//     </Card>)
  }

  function PotentialTable() {
    return <Table>
      <thead>
        <tr>
        <th> Nombre Completo </th>
        <th> Puntuación</th>
        <th> Parámetros cumplidos</th>
        <th> Ver detalles </th>
        {!readOnly && <><th>  </th>
        <th>  </th></>}
        </tr>
        </thead>
        <tbody>
        {potentialCandidates.map((candidate, i) => (
          <tr key={candidate.id}>
 <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
            <td> {calculateScore(candidate)}/{maxScore} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / maxScore ).toFixed(2): 0}%) </td>
            <td> {parametersFound(candidate)} </td>
            <td> <Button color="info" onClick={() => {props.navigate(`${candidate.curriculumData.discoveryId}`, {state: candidate})}}> <TiDocumentText size={24}/> </Button></td>
        {!readOnly && <td>  <Button color="primary" onClick={() => moveCandidate(i, potentialCandidates, setPotentialCandidates, finalCandidates, setFinalCandidates)}> <FaArrowUp/> Seleccionar </Button></td> }
            {!readOnly && <td> <Button onClick={() => moveCandidate(i, potentialCandidates, setPotentialCandidates, rejectedCandidates, setRejectedCandidates)}> <FaArrowDown /> Rechazar </Button></td>}
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
        {!readOnly &&
        <>
        <th> </th>
        <th>  </th>
        <th>  </th>
        </>
        }
        </tr>
        </thead>
        <tbody>
        {rejectedCandidates.map((candidate, i) => (
          <tr key={candidate.id}>
 <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
            <td> {calculateScore(candidate)}/{maxScore} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / maxScore ).toFixed(2): 0}%) </td>
            <td> {parametersFound(candidate)} </td>
            <td> <Button color="info" onClick={() => {props.navigate(`${candidate.curriculumData.discoveryId}`, {state: candidate})}}> Ver detalles </Button></td>
        {!readOnly && <td>  <Button color="primary" onClick={() => moveCandidate(i, rejectedCandidates, setRejectedCandidates, potentialCandidates, setPotentialCandidates)}> <FaArrowUp/> </Button></td> }
            {!readOnly && <td>  <Button color="danger" onClick={() => removeRejectedCandidate(i)}> Remover candidato </Button> </td> }
            <td></td>
          </tr>
        ))}
        </tbody>
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
        {!readOnly && <th>  </th>}
        {!readOnly && <th>  </th>}
        </tr>
        </thead>
        <tbody>
        {finalCandidates.map((candidate, i) => (
          <tr key={candidate.id}>
 <td> {`${candidate.curriculumData.firstName} ${candidate.curriculumData.lastName}`}</td>
            <td> {calculateScore(candidate)}/{maxScore} ({calculateScore(candidate) !== 0 ?(  (calculateScore(candidate)   * 100) / maxScore ).toFixed(2): 0}%) </td>
            <td> {parametersFound(candidate)} </td>
            <td> <Button color="info" onClick={() => {props.navigate(`${candidate.curriculumData.discoveryId}`, {state: candidate})}}> Ver detalles </Button></td>
        {!readOnly && <td> <Button onClick={() => moveCandidate(i, finalCandidates, setFinalCandidates, potentialCandidates, setPotentialCandidates)}><FaArrowDown/></Button> </td> }
          </tr>
        ))}
        </tbody>
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

  if (projectModified) {
    setProjectModified(false)
    uploadChanges();
  }
  return (
     <>
     {/* <Navbar/> */}
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

          {!readOnly && <Card className="mb-2 mt-2">
            <Button block color="secondary" onClick={() => setAddCollapse(!addCollapse)}>Agregar Candidatos </Button>
            <Collapse isOpen={addCollapse}>
            <AddToProject/>
            </Collapse>
          </Card>}
          {!readOnly && <Card className="mb-2 mt-2">
            <Button block color="secondary" onClick={() => {setModifyCollapse(!modifyCollapse)}}> Cambiar criterios del proyecto </Button>
            <Collapse isOpen={modifyCollapse}>
            {!loading && <AdvancedSearch searchParams={projectCriteria} onSubmit={modifySearchParams}/>}
            {criteriaChange &&<div className="d-flex justify-content-center"><Spinner/></div> }
            </Collapse>
          </Card>}
          {!readOnly && <Button block onClick= {() => uploadChanges()} color="success"> Guardar Cambios</Button>}
          {!readOnly && <Button block onClick= {() => setModal(!modal)} color="danger"> Cerrar Proyecto </Button>}
          {readOnly && <Button block onClick={() => props.navigate('../')}> Volver </Button>}
          </Col>
        </Row>
        </Container>}
        <CloseProjectModal/>
        </>
  )
}
