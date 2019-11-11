import React, {useState} from 'react'
import {Table, Button, Spinner} from 'reactstrap';
import Moment from 'moment';

export default function ProjectTable({projects, navigate, ...props} ) {
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
        {projects.map(project => (
          <tr key={project.id}>
            <td> {project.name} </td>
            <td> {project.totalCandidates}</td>
            <td> {Moment(project.startDate.toDate()).format('DD/MM/YYYY')}</td>
            <td> <Button onClick={() => navigate(project.id, {state: {...project, startDateString: Moment(project.startDate.toDate()).format('DD/MM/YYYY') }})}> Ver proyecto </Button></td>
          </tr>
        )
        )}
      </tbody>
  </Table>;
}
