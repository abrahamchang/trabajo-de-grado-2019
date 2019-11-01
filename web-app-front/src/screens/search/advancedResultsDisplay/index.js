import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, InputGroup, InputGroupAddon, Table, Input, Button, Spinner, Label, Collapse} from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import AdvancedSearch from './advancedSearch';

const AdvancedResultsDisplay = ({searchResult}) => {

      if (searchResult && searchResult.length !== 0) {
      return (
        <Table>
          <thead>
            <tr>
              <th> Nombre </th>
              <th> Apellido </th>
              <th> Nombre de archivo </th>
              <th> Puntuación </th>
              <th> Parámetros cumplidos </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((searchEntry, index) => (
              <tr key={searchEntry.id}>
                <td>{searchEntry.metadata.firstName} </td>
                <td>{searchEntry.metadata.lastName}</td>
                <td>{searchEntry.metadata.fileName}</td>
                <td> {`${searchEntry.result_metadata.score.toFixed(2)} (${searchEntry.result_metadata.score * 100 / maxScore}%)`} </td>
                <td> {searchEntry.result_metadata.confidence.toFixed(2)} </td>
                <td>
                  <Button color="primary" onClick={() => props.navigate(searchEntry.id, {state: searchEntry})}> Ver más </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
            }
            else {
                return (
                    <p> La búsqueda no tuvo resultados. </p>
                )
            }



}


export default AdvancedResultsDisplay;