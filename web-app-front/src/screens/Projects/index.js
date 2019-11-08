import React, {useState, useEffect} from 'react';
import ProjectTable from './ProjectTable';
import AdvancedSearch from '../../components/advancedSearch'
import {Container, Row, Col, Card, Button, Input, Label, Collapse} from 'reactstrap';
import Firebase from '../../firebase';

const Proyects = (props) => {
    const [newProyect, setNewProyect] = useState(false)
    const [projectName, setProyectName] = useState('')
    const [projects, setProyects] = useState([])

    useEffect(() => {
      let subscription = Firebase.subscribeProyects((projects) => {

        let projectArray = []
        projects.forEach(project => projectArray.push({id: project.id, ...project.data()})
          )
          console.log(projectArray)
        setProyects(projectArray)
      })

      return () => { subscription() }
    }, [])

    function createProyect(projectCriteria) {
        const project = {
          projectCriteria: projectCriteria,
          totalCandidates: 0,
          name: projectName,
          startDate: new Date(),
          status: 'Abierto'
        }
        console.log(project)
        Firebase.createProyect(project)
    }





    return props.location.pathname === '/projects' ?  (
      <Container className="mb-2">
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
            { projects.length > 0 ?            <Card className="my-lg-5 my-md-4 my-3">
              <ProjectTable projects={projects} navigate={props.navigate} />
            </Card> : <Card className=" mt-2 mb-2 d-flex align-items-center"> <h3 className="text-center mb-4"> No existen proyectos</h3>  <h4 className="text-muted text-center"> Presione el botón "Nuevo proyecto" para agregar uno</h4>  </Card>}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
            <Card>
              <Button
                onClick={() => setNewProyect(!newProyect)}
                color="success"
              >
                Nuevo Proyecto
              </Button>
              <Col className="ml-1 mr-1">
                <Collapse isOpen={newProyect}>
                  <Row className="mb-2 mt-2">
                    <Col md={12}>
                      <Label for="nombre">
                        <b>Nombre del Proyecto </b>
                      </Label>
                      <Input
                        value={projectName}
                        onChange={e => setProyectName(e.target.value)}
                      ></Input>
                    </Col>
                    <Col md={12} className="mb-2 mt-2">
                      <b> Condiciones de búsqueda </b>
                    </Col>
                    <AdvancedSearch projects onSubmit={createProyect} />
                  </Row>
                </Collapse>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
    ) : props.children;
};

export default Proyects;