
import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, InputGroup, InputGroupAddon, Table, Input, Button, Spinner} from 'reactstrap';
import { FaSearch } from 'react-icons/fa';


const Search = (props) => {
  console.log(props)
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [didFirstLoad, setDidFirstLoad] = useState(false);
    const [userInput, setUserInput] = useState('')

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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((curriculum, index) => (
                <tr key={curriculum.id}>
                  <td>Data de Firebase </td>
                  <td>Data de Firebase</td>
                  <td>{curriculum.extracted_metadata.filename}</td>
                  <td>
                    <Button color="primary" onClick={() => props.navigate(curriculum.id, {discoveryId: curriculum.id})}> Ver más </Button>
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
        {props.location.pathname === '/search' ?
 <Container>
          <Row className="justify-content-center">
            <Col lg={12} className="d-flex flex-column">
              <Card className="my-lg-5 my-md-4 my-3">
                <CardTitle>
                  <Col lg={12} className="mx-auto mt-3">
                    <InputGroup>
                      <Input type="search" placeholder="Inserte su búsqueda" onChange={_handleChange} onKeyDown={_handleKeyDown}/>
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
                  </Col>
                </CardTitle>
                <CardBody>
                  {didFirstLoad &&
                    (loading ? (
                      <div className="d-flex justify-content-center">
                        <Spinner color="primary" />
                      </div>
                    ) : (
                      displayResults()
                    ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
         : props.children}
      </div>
    );
};

export default Search;