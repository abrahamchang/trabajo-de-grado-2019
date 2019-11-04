import React from 'react';
import {  Table, Button} from 'reactstrap';

import { isNumber } from 'util';


const AdvancedResultsDisplay = ({advancedSearchResults: searchResult, ...props}) => {

  function calculateMaxScore(searchEntry) {
    const values = Object.values(searchEntry);
    const reducer = (acc, curr) => { return isNumber(curr) ? acc + curr : acc }
    return values.reduce(reducer, 0)
  }

  function calculateScore(searchEntry) {
    const {languageFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
    workplacesFound} =searchEntry;
      const {languageWeight, previousWorksWeight, searchTermWeight, titlesWeight, universitiesWeight, workExperienceYearsWeight, workplacesWeight} = searchEntry;
    let totalScore = 0;
    if (languageFound) totalScore += languageWeight;
    if (previousWorksFound) totalScore += previousWorksWeight;
    if (searchTermFound) totalScore += searchTermWeight;
    if (titlesFound) totalScore += titlesWeight;
    if (universitiesFound) totalScore += universitiesWeight;
    if (workExperienceYearsFound) totalScore += workExperienceYearsWeight;
    if (workplacesFound) totalScore += workplacesWeight
    return totalScore
  }
  function parametersFound(searchEntry) {
    const {languageFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
      workplacesFound} = searchEntry;
      let parametersFound = '';
    if (languageFound) parametersFound += 'Idiomas, ';
    if (previousWorksFound) parametersFound += 'Trabajos previos, ';
    if (searchTermFound) parametersFound += 'Términos de búsqueda, ';
    if (titlesFound) parametersFound += 'Títulos, ';
    if (universitiesFound) parametersFound += 'Universidades, ';
    if (workExperienceYearsFound) parametersFound += 'Años de experiencia, ';
    if (workplacesFound) parametersFound += 'Empresas de referencía, '
    parametersFound = parametersFound.trim();

    return parametersFound.replace(/.$/,".")
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
             {const {firstName, lastName, storageRef} = searchEntry.curriculumData;

               return (<tr key={searchEntry.id}>
                <td> {firstName} </td>
                <td> {lastName} </td>
                <td>  {storageRef.split('/')[2]}</td>
                <td> {calculateScore(searchEntry)}/{calculateMaxScore(searchEntry)} ({calculateScore(searchEntry) !== 0 ?(  (calculateScore(searchEntry)   * 100) / calculateMaxScore(searchEntry) ): 0}%)  </td>
                <td> {parametersFound(searchEntry)} </td>
                <td>
                  <Button color="primary" onClick={() => props.navigator(searchEntry.curriculumData.discoveryId, {state: searchEntry})}> Ver más </Button>
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