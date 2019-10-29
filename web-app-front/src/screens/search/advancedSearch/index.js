import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, InputGroup, InputGroupAddon, Table, Input, Button, Spinner, Label, FormGroup, ListGroup, ListGroupItem, Badge} from 'reactstrap';





    const AdvancedSearch = () => {

      const PersonalData = () => {
        return (
          <>
            <Row>
              <Col lg={12}>
                <h4>Filtros de data personal </h4>
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
              <Col md={12}>
                <Label for="email"> Email </Label>
                <Input />
              </Col>
            </Row>
            <Row>
              <Col md={1}>
              <Label for ="Telefono"> Código </Label>
                <Input value="+"/>
              </Col>
              <Col md={5}>
              <Label for ="Telefono"> Teléfono </Label>
              <Input/>
              </Col>
              <Col md={6} className={'mt-2'}>
                <b> Teléfonos en búsqueda</b>
              <ListGroup  >
          <ListGroupItem className="justify-content-between">Cras justo odio <Badge pill>14</Badge></ListGroupItem>
          <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge pill>2</Badge></ListGroupItem>
          <ListGroupItem className="justify-content-between">Morbi leo risus <Badge pill>1</Badge></ListGroupItem>
          </ListGroup>
                </Col>
            </Row>
          </>
        );
      }

      function WorkAndEducation() {
        return (
          <p>hi </p>
        )
      }
      return (
      <Col className="ml-1 mt-2">
        <PersonalData/>
      </Col>)
    }

    export default AdvancedSearch;