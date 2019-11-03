import React from 'react';
import ProyectTable from './ProyectTable';
import AdvancedSearch from '../../components/advancedSearch'
import {Container, Row, Col, Card, Button, Input, Label} from 'reactstrap'
const Proyects = () => {
    function AddProyect()  {
        return (
          <Row>
            <Col md={6}>
                <Label for="nombre"> Nombre del Proyecto</Label>
                <Input> </Input>
            </Col>
            <Col md={6}>
            <Label for="nombre"> Algo mas?</Label>
            <Input> </Input>
            </Col>
            <AdvancedSearch/>
          </Row>
        );
    }




    return (
      <Container>
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
              <Button> Agregar Proyecto </Button>
                <AddProyect/>
                </Card>
              </Col>
              </Row>
      </Container>
    );
};

export default Proyects;