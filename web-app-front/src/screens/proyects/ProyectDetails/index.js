import React from 'react'
import {CardTitle, CardSubtitle,  Card, Container, Row, Col, Table} from 'reactstrap'
import Moment from 'moment';
export default function ProyectDetails(props) {
  const {name, startDateString} = props.location.state

  function AddToProyect() {

  }

  function PotencialCandidates() {

  }

  function RejectedCandidates() {

  }

  function FinalCandidates() {
    return (      <Table>
        <th> </th>
        <th> </th>
        <th> </th>
      </Table>)
  }

  function ProyectManagement() {
    return (<Card>
      <CardTitle> <h3> Candidatos Seleccionados </h3> </CardTitle>
    </Card>)
  }
  return (
    <Container className="mb-2 mt-2">
    <Row className="justify-content-center">
      <Col lg={12} className="d-flex flex-column">
        <Card>
          <CardTitle className="align-self-center"> <h3> {name} </h3>  </CardTitle>
          <CardSubtitle className="align-self-center"> <h6 className="text-muted"> Fecha de apertura: {Moment().format('DD/MM/YYYY')} </h6></CardSubtitle>
        </Card>
        </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <ProyectManagement></ProyectManagement>
          </Col>
        </Row>
        </Container>
  )
}
