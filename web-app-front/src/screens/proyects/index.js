import React, {useState} from 'react';
import ProyectTable from './ProyectTable';
import AdvancedSearch from '../../components/advancedSearch'
import {Container, Row, Col, Card, Button, Input, Label, Collapse} from 'reactstrap';
const Proyects = () => {
    const [newProyect, setNewProyect] = useState(false)
    function AddProyect()  {
        return (
          <Row className="mb-2">
            <Col md={12}>
                <Label for="nombre"> Nombre del Proyecto</Label>
                <Input> </Input>
            </Col>
            <AdvancedSearch proyects/>
          </Row>
        );
    }




    return (
      <Container className="mb-2" >
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
            <Card className="my-lg-5 my-md-4 my-3">
            <ProyectTable proyects={[{ name: 'hola' }]} />
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
              <Card>
              <Button onClick={() => setNewProyect(!newProyect)} color="success" > Nuevo Proyecto </Button>
                  <Col className="ml-1 mr-1">
              <Collapse isOpen={newProyect}>
                <AddProyect/>
                </Collapse>
                </Col>
                </Card>
              </Col>
              </Row>
      </Container>
    );
};

export default Proyects;