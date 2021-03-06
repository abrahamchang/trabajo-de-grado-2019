import React, {useState, useEffect} from 'react';
import ProjectTable from './ProjectTable';
import ClosedProjectTable from './ClosedProjectTable';
import AdvancedSearch from '../../components/advancedSearch';
import {Container, Row, Col, Card, Button, Input, Label, Collapse, Spinner, CardTitle, Alert} from 'reactstrap';
import Firebase from '../../firebase';
// import Navbar from '../../components/navbar';
const Proyects = (props) => {
    const [newProject, setnewProject] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);
    const [closedProjects, setClosedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
      (async () => {
        const closedProjectsSnapshot = await Firebase.getClosedProjects();
        let closedProjects = []
        closedProjectsSnapshot.forEach(project => {
          closedProjects.push({id: project.id, ...project.data()})
        })
        setClosedProjects(closedProjects)
      })();
      let subscription = Firebase.subscribeActiveProjects((projects) => {
        let projectArray = []
        projects.forEach(project => projectArray.push({id: project.id, ...project.data()})
          )
          console.log(projectArray)
          setLoading(false)
        setProjects(projectArray)
      })
      return  () => {
        subscription();
      }
    }, [])

    function createProject(projectCriteria) {
      setErrorMessage('')
        const project = {
          projectCriteria: projectCriteria,
          totalCandidates: 0,
          name: projectName,
          startDate: new Date(),
          status: 'Abierto',
          finalCandidates: [],
          potentialCandidates: [],
          rejectedCandidates: []
        }
        if (Object.values(project.projectCriteria).reduce((acc, curr) => acc || curr, false)) {
          setnewProject(!newProject)
        Firebase.createProject(project)
        setProjectName('')
        }
        else {
          setErrorMessage('Debe seleccionar por lo menos un criterio.')
        }
    }





    return props.location.pathname === '/projects' ?  (
      <>
      {/* <Navbar/> */}
      <Container className="mb-2">
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
            { loading ? <Card className="d-flex justify-content-center align-items-center mb-2 mt-2"> <b className="mb-2"> Cargando proyectos </b><Spinner className="mb-2"/></Card>  : (projects.length > 0 || closedProjects.length > 0) ?            <Card className="my-lg-5 my-md-4 my-3">
             <CardTitle className="d-flex justify-content-center align-items-center"> <h2> Proyectos abiertos</h2> </CardTitle>
              <ProjectTable projects={projects} navigate={props.navigate} />
              <CardTitle className="d-flex justify-content-center align-items-center"> <h2> Historial de proyectos</h2> </CardTitle>
              <ClosedProjectTable projects={closedProjects} navigate={props.navigate} />
            </Card> : <Card className=" mt-2 mb-2 d-flex align-items-center"> <h3 className="text-center mb-4"> No existen proyectos</h3>  <h4 className="text-muted text-center"> Presione el botón "Nuevo proyecto" para agregar uno</h4>  </Card>}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
            <Card>
              <Button
                onClick={() => setnewProject(!newProject)}
                color="success"
              >
                Nuevo Proyecto
              </Button>
              <Col className="ml-1 mr-1">
                <Collapse isOpen={newProject}>

                  <Row className="mb-2 mt-2">
                    <Col md={12}>
                  { errorMessage &&  <Alert color="danger">
          {errorMessage}
      </Alert>}
                      <Label for="nombre">
                        <b>Nombre del Proyecto </b>
                      </Label>
                      <Input
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                      ></Input>
                    </Col>
                    <Col md={12} className="mb-2 mt-2">
                      <b> Condiciones de búsqueda </b>
                    </Col>
                    <AdvancedSearch projects onSubmit={(pc) => {createProject(pc)}} />
                  </Row>
                </Collapse>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
      </>
    ) : props.children;
};

export default Proyects;