import React, {useState, useEffect} from 'react';
import {  Table, Button} from 'reactstrap';

import { isNumber } from 'util';


const AdvancedResultsDisplay = ({advancedSearchResults,maxScore,...props}) => {

  const [searchResult, setSearchResult] = useState(advancedSearchResults);
  // const [maxScore, setMaxScore] = useState(0)
  // function calculateMaxScore(searchEntry) {
  //   const values = Object.values(searchEntry);
  //   const reducer = (acc, curr) => { return isNumber(curr) && curr >= 1 ? acc + curr : acc }
  //   return values.reduce(reducer, 0)
  // }


  useEffect(() => {
    let srcopy = [...searchResult]
    srcopy.sort((result1, result2) => {
      return calculateScore(result2) - calculateScore(result1);
    })
    setSearchResult(srcopy)
    console.log('test')
  }, [])

  function calculateScore(searchEntry) {
    const {languagesFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
    workplacesFound, skillsFound, citiesFound} =searchEntry;
      const {languageWeight, previousWorksWeight, searchTermWeight, titlesWeight, universitiesWeight, workExperienceYearsWeight, workplacesWeight,skillsWeight} = searchEntry;
      const {totalLanguages, totalPreviousWorks, totalSearchTerm, totalTitles, totalUniversities, totalWorkplaces, totalSkills, totalCities} = searchEntry;
    let totalScore = 0;
    if (languagesFound) totalScore += totalLanguages;
    if (previousWorksFound) totalScore += totalPreviousWorks;
    if (searchTermFound) totalScore += totalSearchTerm;
    if (titlesFound) totalScore += totalTitles;
    if (universitiesFound) totalScore += totalUniversities;
    if (workExperienceYearsFound) totalScore += workExperienceYearsWeight;
    if (workplacesFound) totalScore += totalWorkplaces;
      if (skillsFound) totalScore += totalSkills;
      if (citiesFound) totalScore += totalCities;
    return totalScore
  }
  function parametersFound(searchEntry) {
    const {languagesFound, previousWorksFound, searchTermFound, titlesFound, universitiesFound, workExperienceYearsFound,
      workplacesFound, skillsFound, citiesFound} = searchEntry;
      const {totalLanguages, totalPreviousWorks, totalSearchTerm, totalTitles, totalUniversities, totalWorkplaces, totalSkills, totalCities} = searchEntry;
      let parametersFound = '';
    if (languagesFound) parametersFound += `Idiomas (${totalLanguages}), `;
    if (previousWorksFound) parametersFound += `Trabajos previos (${totalPreviousWorks}), `;
    if (searchTermFound) parametersFound += `Términos de búsqueda (${totalSearchTerm}), `;
    if (titlesFound) parametersFound += `Títulos (${totalTitles}), `;
    if (universitiesFound) parametersFound += `Universidades (${totalUniversities}), `;
    if (workExperienceYearsFound) parametersFound += `Años de experiencia, `;
    if (workplacesFound) parametersFound += `Empresas de referencía (${totalWorkplaces}), `;
    if (skillsFound) parametersFound += `Habilidades (${totalSkills}), `
    if (citiesFound) parametersFound += `Ciudad (${totalCities}), `
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
              <th> Puntuación </th>
              <th> Parámetros cumplidos </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((searchEntry) =>
             {const {firstName, lastName} = searchEntry.curriculumData;

               return (<tr key={searchEntry.id}>
                <td> {firstName} </td>
                <td> {lastName} </td>
                <td> {calculateScore(searchEntry)}/{maxScore} ({(calculateScore(searchEntry) !== 0 ?(  (calculateScore(searchEntry)   * 100) / maxScore ): 0).toFixed(2)}%)  </td>
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