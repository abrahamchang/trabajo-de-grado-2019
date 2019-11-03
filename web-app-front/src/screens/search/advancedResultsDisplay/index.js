import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, InputGroup, InputGroupAddon, Table, Input, Button, Spinner, Label, Collapse} from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { isNumber } from 'util';


const AdvancedResultsDisplay = (searchResult, ...props) => {
  function calculateMaxScore(searchEntry) {
    delete searchEntry.curriculumData;
    delete searchEntry.id;
    const values = searchEntry.values();
    const reducer = (acc, curr) => { return isNumber(curr) ? acc + curr : acc }
    return values.reduce(reducer, 0)
  }

  function calculateScore(searchEntry,maxScore) {
    //const {languageFound}
    // delete searchEntry.curriculumData;
    // // delete searchEntry.id;
    // let totalScore = 0;
    // if (languageFound) totalScore += languageWeight;
    // if (previousWorksFound) totalScore += previousWorksWeight;
    // if (searchTermFound) totalScore += searchTermWeight;
    // if (titlesFound) totalScore += titlesWeight;
    // if (unviersitiesFound) totalScore += universitiesWeight;
    // if (workExperienceYearsFound) totalScore += workExperienceYearsWeight;
    // if (workplacesFound) totalScore += workplacesWeight
    // return totalScore
  }
  function calculateFound(searchEntry) {
    // delete searchEntry.curriculumData;
    // delete searchEntry.id;
    // let totalParams = 0;
    // let totalFound = 0
    // //if (languageFound !=) totalScore += languageWeight;
    // if (previousWorksFound) totalScore += previousWorksWeight;
    // if (searchTermFound) totalScore += searchTermWeight;
    // if (titlesFound) totalScore += titlesWeight;
    // if (unviersitiesFound) totalScore += universitiesWeight;
    // if (workExperienceYearsFound) totalScore += workExperienceYearsWeight;
    // if (workplacesFound) totalScore += workplacesWeight
    // return totalScore
  }


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
            {searchResult.map((searchEntry, index) =>
             { const {firstName, lastName} = searchEntry.curriculumData;
            //  const {}
               return (<tr key={searchEntry.id}>
                <td> {firstName} </td>
                <td> {lastName} </td>
                <td></td>
                <td> hola </td>
                <td>  </td>
                <td>
                  <Button color="primary" onClick={() => props.navigate(searchEntry.id, {state: searchEntry})}> Ver más </Button>
                </td>
              </tr>)}
            )}
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