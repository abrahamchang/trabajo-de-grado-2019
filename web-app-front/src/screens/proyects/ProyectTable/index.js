import React from 'react'
import {Table} from 'reactstrap';

export default function ProyectTable({proyects}) {
  return <Table>
    <thead>
      <tr>
        <th>Nombre del Proyecto</th>
        <th>Nro. de candidatos potenciales</th>
        <th> Ver proyecto</th>
      </tr>
      </thead>
      <tbody>
        {proyects.map(proyect => (
          <tr>
            <td> {proyect.name} </td>
            <td> 99</td>
            <td> <button> Ver proyecto </button></td>
          </tr>
        )
        )}
      </tbody>
  </Table>;
}
