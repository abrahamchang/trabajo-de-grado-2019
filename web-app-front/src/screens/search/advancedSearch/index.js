import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, InputGroup, InputGroupAddon, Table, Input, Button, Spinner, Label, FormGroup, ListGroup, ListGroupItem, Badge, Collapse} from 'reactstrap';
import Transition from 'react-transition-group/Transition';




    const AdvancedSearch = () => {
      const [collapsePersonalData, setCollapsePersonalData] = useState(true)
      const PersonalData = () => {
        return (
          <>
          <h4 onClick={() => setCollapsePersonalData(!collapsePersonalData)}>Filtros de data personal </h4>
          <Collapse isOpen={collapsePersonalData}  >
            <Row >
              <Col lg={12}>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label for="Nombre"> Nombre </Label>
                <Input />
              </Col>
              <Col md={6}>
                <Label for="Apellido"> Apellido </Label>
                <Input />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label for="email"> Email </Label>
                <Input />
              </Col>
              <Col md={6}>
                <Label for="titulo"> Título Universitario </Label>
                <Input />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={2}>
                    <Label for="Telefono"> Código </Label>
                    <Input value="+" />
                  </Col>
                  <Col md={10}>
                    <Label for="Telefono"> Teléfono </Label>
                    <Input />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="mt-4">
                <Button className="mr-2"> Agregar Teléfono </Button>
                <Button> Remover Teléfono </Button>
                </Col>
              </Row>
              </Col>
              <Col md={6} className='mt-2'>
                <b> Teléfonos en búsqueda</b>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">
                    Cras justo odio
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    Dapibus ac facilisis in
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    Morbi leo risus
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Collapse>
          </>
        );
      }

      function SpecificConcepts() {
        return (
            <>
            <Row>
              <Col md={3}>
                <Label for="experience"> Años de Experiencia</Label>
                <Input/>
              </Col>
              <Col md={3}>
                <Label for="experience"> Edad </Label>
                <Input/>
              </Col>
            </Row>
            <Row className='ml-4'>
            <Label check>
          <Input type="radio" /> El candidato debe tener título universitario
        </Label>
        </Row>
        <Row className='ml-4'>
        <Label check>
          <Input type="radio" /> El candidato debe tener experiencia laboral previa
        </Label>
          </Row>
            </>
        )
      }

      function WorkAndEducation() {
        return (
          <>
            <Row>
              <Col md={6}>
                <Label for="Idiomas"> Idiomas necesarios: </Label>
                <Input> </Input>
              </Col>
              <Col md={6}>
                <b> Idiomas en búsqueda </b>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">
                    Cras justo odio
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    Dapibus ac facilisis in
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    Morbi leo risus
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label for="Idiomas"> Cargos previos ejercidos: </Label>
                <Input> </Input>
              </Col>
              <Col md={6}>
                <b> Cargos en búsqueda </b>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">
                    Cras justo odio
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    Dapibus ac facilisis in
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    Morbi leo risus
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label for="Idiomas"> Universidades atendidas: </Label>
                <Input> </Input>
              </Col>
              <Col md={6}>
                <b> Universidades en búsquedas </b>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">
                    Cras justo odio
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    Dapibus ac facilisis in
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    Morbi leo risus
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>

          </>
        );
      }
      return (
      <Col className="ml-1 mt-2">
        <PersonalData/>
        <WorkAndEducation/>
        <SpecificConcepts/>
      </Col>)
    }

    export default AdvancedSearch;