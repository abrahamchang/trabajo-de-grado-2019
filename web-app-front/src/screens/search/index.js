
import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, InputGroup, InputGroupAddon, Table, Input, Button, Spinner, Collapse} from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import AdvancedSearch from '../../components/advancedSearch';
import AdvancedResultsDisplay from './advancedResultsDisplay';
const Search = (props) => {

    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [didFirstLoad, setDidFirstLoad] = useState(false);
    const [userInput, setUserInput] = useState('')
    const [maxScore, setMaxScore ] = useState(0)
    const [advancedSearchActive, setAdvancedSearchActive] = useState(false)
    const [advancedSearchResults, setAdvancedSearchResults] = useState(null)
    function findHighestScore(results) {
      const reducer = (acc, curr) => (curr.result_metadata.score > acc ? curr.result_metadata.score : acc)
      return results.reduce(reducer, 0)

    }

    const onAdvancedSearchSubmit = async (searchParams) => {
      console.log(searchParams)
      setLoading(true)
      setDidFirstLoad(true)
      const url = 'https://us-central1-trabajo-de-grado-2019.cloudfunctions.net/advancedSearch'
      const postParams = {
        method: 'POST',
        headers: {
        },
        body: JSON.stringify(searchParams)
      }
      try {
        const searchResponse = await fetch(url, postParams)
        const searchResults = await searchResponse.json();
        console.log(searchResults)
        setAdvancedSearchResults(searchResults)
        setLoading(false)
        setAdvancedSearchActive(false)
      }
      catch(err) {
        console.log(err)
      }
    }

    const onSearchSubmit = async () => {
        setLoading(true)
        setDidFirstLoad(true)
        const query = userInput;
        console.log(query)
        const url = 'https://us-south.functions.cloud.ibm.com/api/v1/web/lucianopinedo%40gmail.com_dev/default/naturalLanguagueQuery'
        const postParams = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
             },
            body: JSON.stringify({
       "query": query
       }),
        }
        try {
        const searchResult = await fetch(url, postParams);
        const searchJson = await searchResult.json()
        console.log(searchJson);
        setMaxScore(findHighestScore(searchJson.results))
        setSearchResult(searchJson.results)
        setLoading(false)
        }
        catch(err) {
            console.log(err)
        }
       }

    const _handleKeyDown = (e) => {
        return e.key === 'Enter' ? onSearchSubmit() : null;
    }

    const _handleChange = (e) => {
        setUserInput(e.target.value)
    }




    const displayResults = () => {
        if (searchResult && searchResult.length !== 0) {
        return (
          <Table>
            <thead>
              <tr>
                <th> Nombre </th>
                <th> Apellido </th>
                <th> Nombre de archivo </th>
                <th> Puntuación </th>
                <th> Confianza </th>
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


    return (
      <div>
        {props.location.pathname === '/search' ? (
          <Container>
            <Row className="justify-content-center">
              <Col lg={12} className="d-flex flex-column">
                <Card className="my-lg-5 my-md-4 my-3">
                  <CardTitle>
                    <Col lg={12} className="mx-auto mt-3">
                      {advancedSearchActive ? null : (
                        <InputGroup>
                          <Input
                            type="search"
                            placeholder="Inserte su búsqueda"
                            onChange={_handleChange}
                            onKeyDown={_handleKeyDown}
                          />
                          <InputGroupAddon addonType="append">
                            <Button
                              type="submit"
                              color="secondary"
                              onClick={() => {
                                onSearchSubmit();
                              }}
                            >
                              <FaSearch />
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      )}
                      <Button
                        color="primary"
                        onClick={() =>
                          setAdvancedSearchActive(!advancedSearchActive)
                        }
                        className="mt-2"
                      >
                        {advancedSearchActive
                          ? 'Ocultar Búsqueda Avanzada'
                          : 'Búsqueda Avanzada'}
                      </Button>
                    </Col>
                    <Collapse isOpen={advancedSearchActive}>
                      <AdvancedSearch onSubmit={onAdvancedSearchSubmit} />
                    </Collapse>
                  </CardTitle>
                  <CardBody>
                    {didFirstLoad &&
                      (loading ? (
                        <div className="d-flex justify-content-center">
                          <Spinner color="primary" />
                        </div>
                      ) : advancedSearchResults ? (
                        <AdvancedResultsDisplay advancedSearchResults ={ advancedSearchResults} navigator={props.navigate}/>
                      ) : (
                        displayResults()
                      ))}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          props.children
        )}
      </div>
    );
};

export default Search;