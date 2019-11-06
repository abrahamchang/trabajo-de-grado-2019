import React from 'react'
import {Table, Button} from 'reactstrap';
import Moment from 'moment';
export default function ProyectTable({proyects, navigate, ...props} ) {

  return <Table>
    <thead>
      <tr>
        <th>Nombre del Proyecto</th>
        <th>Nro. de candidatos potenciales</th>
        <th> Fecha de apertura </th>
        <th> Ver proyecto</th>
      </tr>
      </thead>
      <tbody>
        {proyects.map(proyect => (
          <tr key={proyect.id}>
            <td> {proyect.name} </td>
            <td> {proyect.totalCandidates}</td>
            <td> {Moment(proyect.startDate.toDate()).format('DD/MM/YYYY')}</td>
            <td> <Button onClick={() => navigate(proyect.id)}> Ver proyecto </Button></td>
          </tr>
        )
        )}
      </tbody>
  </Table>;
}
