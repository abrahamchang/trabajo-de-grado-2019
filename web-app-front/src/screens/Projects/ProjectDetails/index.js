import React from 'react'
import {CardTitle, CardSubtitle,  Card, Container, Row, Col, Table, Button} from 'reactstrap'
import AdvancedSearch from '../../../components/advancedSearch';
import {FaArrowUp, FaArrowDown, FaArrowRight, FaInfo} from 'react-icons/fa'
export default function ProjectDetails(props) {
  const {name, startDateString, ProjectCriteria} = props.location.state
  const test = [{id: 'a'},{id: 'b'}, {id: 'c'} ]
  function AddToProject() {
    return (<Card>
      <Row className="d-flex justify-content-between">
        <Col md={6}>
          <h4 className="text-center"> Candidatos Recomendados </h4>
          <Table >
          <th> Nombre completo </th>
              <th> Puntuación </th>
              <th> Det. </th>
              <th> Agregar </th>
              {test.map(candidate => (
          <tr key={candidate.id}>
            <td> Hola cocacola</td>
            <td> 10/10</td>
            <td> <Button color="info"> <FaInfo/> </Button></td>
            <td> <Button color="primary"> <FaArrowRight/> </Button></td>
          </tr>
        ))}
              </Table>
        </Col>
        <Col md={6}>
        <h4 className="text-center"> Candidatos Potenciales del Proyecto</h4>
        <Table >
        <th> Nombre completo </th>
              <th> Puntuación </th>
              <th> Det. </th>
              {test.map(candidate => (
          <tr key={candidate.id}>
            <td> Hola cocacola</td>
            <td> 10/10</td>
            <td> <Button color="info"> <FaInfo/> </Button></td>
          </tr>
        ))}
              </Table>
        </Col>
      </Row>
    </Card>)
  }

  function PotencialCandidates() {
    return <Table>
        <th> Nombre Completo </th>
        <th> Puntuación</th>
        <th> Parámetros cumplidos</th>
        <th> Ver detalles </th>
        <th>  </th>
        <th>  </th>
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
    </Table>
  }

  function RejectedCandidates() {
    return <Table>
              <th> Nombre Completo </th>
        <th> Puntuación</th>
        <th> Parámetros cumplidos</th>
        <th> Ver detalles </th>
        <th>  </th>
        <th>  </th>
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

  function FinalCandidates() {
    return (      <Table>
        <th> Nombre Completo </th>
        <th> Puntuación</th>
        <th> Parámetros cumplidos</th>
        <th> Ver detalles </th>
        <th>  </th>
        <th>  </th>
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
      <FinalCandidates/>
      <CardTitle> <h4> Candidatos Potenciales </h4> </CardTitle>
      <PotencialCandidates/>
      <CardTitle> <h4> Candidatos Descartados </h4> </CardTitle>
      <RejectedCandidates/>
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
          <AdvancedSearch searchParams={ProjectCriteria}/>
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
