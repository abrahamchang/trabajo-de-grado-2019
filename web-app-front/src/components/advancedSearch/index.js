import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, InputGroup, InputGroupAddon, Table, Input, Button, Spinner, Label, FormGroup, ListGroup, ListGroupItem, Badge, TabContent, Tab, TabPane, NavItem, NavLink, Nav, CustomInput} from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import classnames from 'classnames';
import s from './styles.scss';

    const AdvancedSearch = ( props ) => {
      const [activeTab, setActiveTab] = useState('1')
      //Search info
      // const [firstName, setFirstName] = useState('')
      // const [lastName, setLastName] = useState('')
      // const [email, setEmail] = useState('');
      // const [codeInput, setCodeInput] = useState('')
      // const [telephoneInput, setTelephoneInput] = useState('')
      // const [telephones, setTelephones] = useState([]);
      const [languageInput, setLanguageInput] = useState('');
      const [languages, setLanguages] = useState([]);
      const [previousWorkInput, setPreviousWorkInput] = useState('');
      const [previousWorks, setPreviousWorks] = useState([]);
      const [universityInput, setUniversityInput] = useState('');
      const [universities, setUniversities] = useState([]);
      const [workplaceInput, setWorkplaceInput] = useState('');
      const [titleInput, setTitleInput] = useState('');
      const [titles, setTitles] = useState([]);
      const [workplaces, setWorkplaces] = useState([]);
      const [cities, setCities] = useState([]);
      const [cityInput, setCityInput] = useState([]);
      const [workExperienceYears, setWorkExperienceYears] = useState(0);
      const [age, setAge] = useState(0);
      const [hasTitle, setHasTitle] = useState(false);
      const [hasExperience, setHasExperience] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');

      function removeLanguage() {
        let newLanguages = [...languages]
        newLanguages.pop();
        setLanguages(newLanguages)
      }

      function removePreviousWork() {
        let newPreviousWorks = [...previousWorks]
        newPreviousWorks.pop();
        setPreviousWorks(newPreviousWorks)
      }

      function removeUniversity() {
        let newUniversities = [...universities];
        newUniversities.pop();
        setUniversities(newUniversities)
      }

      function removeWorkplace() {
        let newWorkplaces = [...workplaces];
        newWorkplaces.pop();
        setWorkplaces(newWorkplaces)
      }

      function removeTitle() {
        let newTitles = [...titles];
        newTitles.pop();
        setTitles(newTitles);
      }

      function removeCity() {
        let newCities = [...cities];
        newCities.pop();
        setCities(newCities)
      }

      const submitSearch = () => {
        const request = {
          languages: languages.length > 0 ? {value: languages,weight: 0.2} : null,
          previousWorks: previousWorks.length > 0 ? {value: previousWorks, weight: 0.2}: null,
          universities: universities.length > 0 ? {value: universities, weight: 0.2} : null,
          workplaces: workplaces.length > 0 ? {value: workplaces,weight:0.2} : null,
          titles: titles.length > 0 ? {value: titles, weight: 0.2 } : null,
          workExperienceYears: workExperienceYears > 0 ? {value: workExperienceYears, weight: 0.2} : null,
          age: age > 18 ? {value: age, weight: 0.2} : null,
          cities: cities.length > 0 ? {value: cities, weight: 0.2} : null,
          hasTitle: {value: hasTitle, weight: 0.2},
          hasExperience: hasExperience,
          searchTerm: searchTerm ? {value: searchTerm, weight: 0.2} : null,
        }

        props.onSubmit(request)

      }

      function ArrayList({arr}) {
        return (
          <ListGroup>
            {arr.map((item, i) => (
              <ListGroupItem
                className="justify-content-between"
                key={`${item}${i}`}
              >
                {item}
              </ListGroupItem>
            ))}
          </ListGroup>
        );
      }


      const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
      }

      function Navigation() {
        return (
          <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Información Educativa
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Información Vocacional
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              Filtros Adicionales
            </NavLink>
          </NavItem>
        </Nav>
        )
      }

    function AdditionalDataSummary() {
      return (         <Row>
        <Col className="d-flex flex-column">
        <b> Resumen de selección </b>
        <p>
              {workExperienceYears && workExperienceYears > 0 ? `El candidato debe tener ${workExperienceYears} años de experiencia` : ''}
            </p>
            <p>
            {age && age > 0 ? `El candidato debe tener al menos ${age} años de edad` : '' }
            </p>
            {hasExperience ? <p>El candidato <b> DEBE </b> tener experiencia laboral previa. </p> : null }
            {hasTitle ? <p>El candidato <b> DEBE </b> tener un título universitario. </p> : null }
            </Col>
      </Row>)
    }

    function Summary() {

      return (
        <Row>
          <Col className="d-flex flex-column">
            {AdditionalDataSummary()}
            {languages.length > 0 ? (
              <>

                <p> Idiomas dominados: </p> <SimpleList arr={languages} />
              </>
            ) : (
              ''
            )}
            {titles.length > 0 ? (
              <>

                <p> Graduado del título: </p> <SimpleList arr={titles} />
              </>
            ) : (
              ''
            )}
            {universities.length > 0 ? (
              <>

                <p>Graduado de la institución: </p>
                <SimpleList arr={universities} />
              </>
            ) : (
              ''
            )}
            {previousWorks.length > 0 ? (
              <>

                <p>Haber trabajado de: </p> <SimpleList arr={previousWorks} />
              </>
            ) : (
              ''
            )}
            {workplaces.length > 0 ? (
              <>

                <p> Empresas de referencia: </p> <SimpleList arr={workplaces} />
              </>
            ) : (
              ''
            )}
            {cities.length > 0 ? (
              <>

                <p> Ciudades Habitadas: </p>
                <SimpleList arr={cities} />
              </>
            ) : (
              ''
            )}
          </Col>
        </Row>
      );
    }

    function SimpleList({arr}) {
      return (<ul>
        {arr.map((item, i) => (<li key ={`${item}-${i}`}> {item} </li>))}
      </ul> )

    }


      return (
        <Col className="ml-1 mt-2">
          <InputGroup className="mb-2">
            <Input
              type="search"
              placeholder="Inserte términos de búsqueda complementarios"
              onChange={e => setSearchTerm(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button>
                <FaSearch />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <Navigation />
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col md={6}>
                  <Label for="Idiomas"> Idiomas necesarios: </Label>
                  <Input
                    type="text"
                    value={languageInput}
                    onChange={e => setLanguageInput(e.target.value)}
                  ></Input>
                  <Row>
                    <Col md={12} className="mt-2">
                      <Button
                        className="mr-2"
                        onClick={() =>
                          setLanguages([...languages, languageInput])
                        }
                      >
                        Agregar Idioma
                      </Button>
                      <Button onClick={() => removeLanguage()}>
                        Remover Idioma
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <b> Idiomas en búsqueda </b>
                  <ArrayList arr={languages} />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label for="Idiomas"> Títulos deseados: </Label>
                  <Input
                    type="text"
                    value={titleInput}
                    onChange={e => setTitleInput(e.target.value)}
                  ></Input>
                  <Row>
                    <Col md={12} className="mt-2">
                      <Button
                        className="mr-2"
                        onClick={() => setTitles([...titles, titleInput])}
                      >
                        Agregar Título a la lista
                      </Button>
                      <Button onClick={() => removeTitle()}>
                        Remover Título de la Lista
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <b> Títulos en búsqueda </b>
                  <ArrayList arr={titles} />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label for="Idiomas"> Universidades buscadas: </Label>
                  <Input
                    type="text"
                    value={universityInput}
                    onChange={e => setUniversityInput(e.target.value)}
                  />
                  <Row>
                    <Col md={12} className="mt-2">
                      <Button
                        className="mr-2"
                        onClick={() =>
                          setUniversities([...universities, universityInput])
                        }
                      >
                        Agregar Universidad a la lista
                      </Button>
                      <Button onClick={() => removeUniversity()}>
                        Remover Universidad de la Lista
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <b> Universidades en búsqueda </b>
                  <ArrayList arr={universities} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col md={6}>
                  <Label for="cargos previos">Cargos previos ejercidos:</Label>
                  <Input
                    type="text"
                    value={previousWorkInput}
                    onChange={e => setPreviousWorkInput(e.target.value)}
                  ></Input>
                  <Row>
                    <Col md={12} className="mt-2">
                      <Button
                        className="mr-2"
                        onClick={() =>
                          setPreviousWorks([
                            ...previousWorks,
                            previousWorkInput
                          ])
                        }
                      >
                        Agregar Cargo a la lista
                      </Button>
                      <Button onClick={() => removePreviousWork()}>
                        Remover Cargo de la Lista
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <b> Cargos en búsqueda </b>
                  <ArrayList arr={previousWorks} />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label for="Idiomas"> Empresas de interés: </Label>
                  <Input
                    type="text"
                    value={workplaceInput}
                    onChange={e => setWorkplaceInput(e.target.value)}
                  ></Input>
                  <Row>
                    <Col md={12} className="mt-2">
                      <Button
                        className="mr-2"
                        onClick={() =>
                          setWorkplaces([...workplaces, workplaceInput])
                        }
                      >
                        Agregar Universidad a la lista
                      </Button>
                      <Button onClick={() => removeWorkplace()}>
                        Remover Universidad de la Lista
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <b> Empresas en búsqueda </b>
                  <ArrayList arr={workplaces} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col md={6}>
                  <Label for="Idiomas"> Ciudades en la que habita: </Label>
                  <Input
                    type="text"
                    value={cityInput}
                    onChange={e => setCityInput(e.target.value)}
                  ></Input>
                  <Row>
                    <Col md={12} className="mt-2">
                      <Button
                        className="mr-2"
                        onClick={() => setCities([...cities, cityInput])}
                      >
                        Agregar Ciudad
                      </Button>
                      <Button onClick={() => removeCity()}>
                        Remover Ciudad
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <b> Ciudades en búsqueda </b>
                  <ArrayList arr={cities} />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={4}>
                      <Label for="experience"> Años de Experiencia</Label>
                      <Input
                        type="number"
                        value={workExperienceYears}
                        onChange={e => setWorkExperienceYears(e.target.value)}
                      />
                    </Col>
                    <Col md={8} className="d-flex align-items-center">
                      <CustomInput
                        type="range"
                        id="exampleCustomRange"
                        name="customRange"
                        min="0"
                        max="100"
                        value={workExperienceYears}
                        onChange={e => setWorkExperienceYears(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Label for="age"> Edad </Label>
                      <Input
                        type="number"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                      />
                    </Col>
                    <Col md={8} className="d-flex align-items-center">
                      <CustomInput
                        type="range"
                        id="ageRange"
                        name="ageRange"
                        min="0"
                        max="100"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="ml-4">
                    <Label check>
                      <Input
                        type="checkbox"
                        value={hasTitle}
                        onChange={e => setHasTitle(e.target.checked)}
                      />
                      El candidato debe tener título universitario
                    </Label>
                  </Row>
                  <Row className="ml-4">
                    <Label check>
                      <Input
                        type="checkbox"
                        value={hasExperience}
                        onChange={e => setHasExperience(e.target.checked)}
                      />
                      El candidato debe tener experiencia laboral previa
                    </Label>
                  </Row>
                </Col>
                <Col md={6}>{AdditionalDataSummary()}</Col>
              </Row>
            </TabPane>
          </TabContent>
          <Card className="mt-3">
            <Container>
              <Summary />
            </Container>
          </Card>
          <Button className="mt-2" onClick={() => submitSearch()}>

            Submit
          </Button>
        </Col>
      );
    }



    export default AdvancedSearch;


          // const PersonalData = () => {
      //   return (
      //     <>
      //     <h4 onClick={() => setCollapsePersonalData(!collapsePersonalData)}>Filtros de data personal </h4>
      //     <Collapse isOpen={collapsePersonalData}  >
      //       <Row >
      //         <Col lg={12}>
      //         </Col>
      //       </Row>
      //       <Row>
      //         <Col md={6}>
      //           <Label for="Nombre"> Nombre </Label>
      //           <Input />
      //         </Col>
      //         <Col md={6}>
      //           <Label for="Apellido"> Apellido </Label>
      //           <Input />
      //         </Col>
      //       </Row>
      //       <Row>
      //         <Col md={6}>
      //           <Label for="email"> Email </Label>
      //           <Input />
      //         </Col>
      //         <Col md={6}>
      //           <Label for="titulo"> Título Universitario </Label>
      //           <Input />
      //         </Col>
      //       </Row>
      //       <Row>
      //         <Col md={4}>
      //           <Label for="Municipio"> Municipio </Label>
      //           <Input />
      //         </Col>
      //         <Col md={4}>
      //           <Label for="Ciudad"> Ciudad </Label>
      //           <Input />
      //         </Col>
      //         <Col md={4}>
      //           <Label for="Estado"> Estado </Label>
      //           <Input />
      //         </Col>
      //       </Row>
      //       <Row>
      //         <Col md={6}>
      //           <Row>
      //             <Col md={2}>
      //               <Label for="Telefono"> Código </Label>
      //               <Input value="+" />
      //             </Col>
      //             <Col md={10}>
      //               <Label for="Telefono"> Teléfono </Label>
      //               <Input />
      //             </Col>
      //           </Row>
      //           <Row>
      //             <Col md={12} className="mt-4">
      //           <Button className="mr-2"> Agregar Teléfono </Button>
      //           <Button> Remover Teléfono </Button>
      //           </Col>
      //         </Row>
      //         </Col>
      //         <Col md={6} className='mt-2'>
      //           <b> Teléfonos en búsqueda</b>
      //           <ListGroup>
      //             <ListGroupItem className="justify-content-between">
      //               Cras justo odio
      //             </ListGroupItem>
      //           </ListGroup>
      //         </Col>
      //       </Row>
      //     </Collapse>
      //     </>
      //   );
      // }