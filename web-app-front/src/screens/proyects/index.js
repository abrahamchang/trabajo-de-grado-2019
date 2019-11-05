import React, {useState} from 'react';
import ProyectTable from './ProyectTable';
import AdvancedSearch from '../../components/advancedSearch'
import {Container, Row, Col, Card, Button, Input, Label, Collapse} from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
const Proyects = () => {
    const [newProyect, setNewProyect] = useState(false)
    const [proyectName, setProyectName] = useState('')
    const [proyects, setProyects] = useState([])
    function createProyect(proyectCriteria) {
        const proyect = {
          proyectCriteria: proyectCriteria,
          totalCandidates: 0,
          proyectName: proyectName,
          startDate: new Date()
        }
        console.log(proyect)
    }





    return (
      <Container className="mb-2">
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
            { proyects.length > 0 ?            <Card className="my-lg-5 my-md-4 my-3">
              <ProyectTable proyects={[]} />
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
                        value={proyectName}
                        onChange={e => setProyectName(e.target.value)}
                      ></Input>
                    </Col>
                    <Col md={12} className="mb-2 mt-2">
                      <b> Condiciones de búsqueda </b>
                    </Col>
                    <AdvancedSearch proyects onSubmit={createProyect} />
                  </Row>
                </Collapse>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};

export default Proyects;