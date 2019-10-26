import React, { useState, useEffect, useCallback } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Form, FormGroup, FormText, Input, Label, Button } from 'reactstrap';

Moment.locale('en')
momentLocalizer()

  const UploadForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState( '');
    const [email, setEmail] = useState( '');
    const [birthDate, setBirthDate] = useState( '');
    const [municipality, setMunicipality] = useState('');
    const [curriculumState, setCurriculumState] = useState( '');
    const [city, setCity] = useState( '');
     const [educationExperience, setEducationExperience] = useState( []);
     const [telephones, setTelephones] = useState( []);
     const [workExperience, setWorkExperience] = useState([]);
     const [languages, setlanguages] = useState([]);
    useEffect(() => {
      const {firstName: firstNameExtracted, lastName: lastNameExtracted, email: emailExtracted, birthDate: birthDateExtracted, municipality: municipalityExtracted, city: cityExtracted, state: stateExtracted, language: languagesArray, skills: skillsArray, educationData: educationArray, workData: workArray, telephones: telephonesArray } = props

      setFirstName(firstNameExtracted ? firstNameExtracted : '')
      setLastName(lastNameExtracted ? lastNameExtracted : '')
      setEmail(emailExtracted ? emailExtracted : '')
      setBirthDate(birthDateExtracted ? birthDateExtracted : '')
      setMunicipality(municipalityExtracted ? municipalityExtracted : '');
      setCurriculumState(stateExtracted ? stateExtracted : '');
      setCity(cityExtracted ? cityExtracted: '')
      setEducationExperience(educationArray ? educationArray : []);
      setTelephones(telephonesArray ? telephonesArray : []);
      setWorkExperience(workArray ? workArray : []);
      setlanguages(languagesArray ? languagesArray : []);
    }, [props.update])
    // const educationExperience = ['a','b']
    // const workExperience = ['c', 'd']
    // const telephones = ['e, f']
    // const language = ['Español', 'Inglés']
      return (
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
            <Card className="my-lg-5 my-md-4 my-3">
              <CardBody>
                <Form>
                  <Row form>
                    <Col lg={6}>
                      <FormGroup>
                        <Label for="Nombres">Nombres</Label>
                        <Input
                          type="text"
                          name="Nombres"
                          value= {firstName? firstName: ''}
                          onChange={e => setFirstName(e.target.value)}
                          id="nombres"
                          placeholder="Luciano"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Label for="Apellidos">Apellidos</Label>
                        <Input
                          type="text"
                          name="Apellidos"
                          id="apellidos"
                          placeholder="Pinedo"
                          value= {lastName? lastName: ''}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="Email">Correo</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="abc@correo.com"
                      value= {email? email: ''}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <Row form>
                    <Col lg={4}>
                      <FormGroup>
                        <Label for="Municipio">Municipio</Label>
                        <Input
                          type="text"
                          name="Municipio"
                          id="Municipio"
                          placeholder="Municipio"
                          value= {municipality? municipality: ''}
                          onChange={e => setMunicipality(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4}>
                      <FormGroup>
                        <Label for="Ciudad">Ciudad</Label>
                        <Input
                          type="text"
                          name="Ciudad"
                          id="Ciudad"
                          placeholder="Ciudad"
                          value= {city? city: ''}
                          onChange={e => setCity(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4}>
                      <FormGroup>
                        <Label for="Estado">Estado</Label>
                        <Input
                          type="text"
                          name="Estado"
                          id="Estado"
                          placeholder="Estado"
                          value= {curriculumState? curriculumState: ''}
                          onChange={e => setCurriculumState(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="Idiomas">Idiomas</Label>
                    {languages.length > 0 ? languages.map((languague, i) => (
                      <Input
                        type="text"
                        name={`Idioma${i}`}
                        id={`${languague}${i}`}
                        placeholder="Inserte un idioma"
                        className="mb-3"
                      />
                    )) :                       <Input
                    type="text"
                    name={`Idioma`}
                    placeholder="Inserte un idioma"
                    className="mb-3"
                  />  }
                  <Row className="justify-content-around">
                  <Button color="primary"> Agregar Idioma</Button>
                  <Button disabled={languages.length <= 0}> Remover Idioma</Button>
                  </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label for="Idiomas">Teléfonos</Label>
                    {telephones.length > 0 ? telephones.map((telephone, i) => (
                      <>
                      <Input
                        type="text"
                        name={`telephone${i}`}
                        id={`telephone${i}`}
                        className="mb-3"
                      />
                      </>
                    )) :
                    <Input
                    type="text"
                    name={`telephone`}
                    placeholder="Inserte un teléfono. Ej: +584121111100"
                    className="mb-3"
                  /> }
                  </FormGroup>
                  <Row className="justify-content-around">
                  <Button color="primary"> Agregar Telefono </Button>
                  <Button disabled={telephones.length <= 0}> Remover Telefono</Button>
                  </Row>
                  <FormGroup>
                    <Label for="Idiomas">Información Educativa</Label>
                    {educationExperience.map((education, i) => (
                      <Input
                        type="text"
                        name={`education${i}`}
                        id={`${education}${i}`}
                        placeholder={education}
                        className="mb-3"
                      />
                    ))}
                  </FormGroup>
                  <Row className="justify-content-around">
                  <Button color="primary"> Agregar Experiencia Educativa</Button>
                  <Button> Remover Experiencia Educativa</Button>
                  </Row>
                    <CardTitle>Información Vocacional</CardTitle>
                    {workExperience.length > 0 ? workExperience.map((work, i) => (
                      <Row form>
                      <Input
                        type="text"
                        name={`work${i}`}
                        id={`work${i}`}
                        placeholder={work}
                        className="mb-3"
                      />
                      </Row>
                    )):
                    <>
                    <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="startDate"> Fecha Inicio </Label>
                      <DateTimePicker/>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                      <Label for="startDate"> Fecha Culminación </Label>
                      <DateTimePicker/>
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row form>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="workplace"> Empresa/Institución </Label>
                    <Input
                      type="text"
                      name="workExperience"
                      placeholder="Empresa/Institución"
                      className="mb-3"
                    />
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                    <Label for="work position"> Posición laboral </Label>
                    <Input
                      type="text"
                      name="workExperience"
                      placeholder="Posición laboral"
                      className="mb-3"
                    />
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="Specialization"> Especialización </Label>
                    <Input
                      type="text"
                      name="workExperience"
                      placeholder="Especialización"
                      className="mb-3"
                    />
                    </FormGroup>
                    </Col>
                      </Row>
                    </> }
                  <Row className="justify-content-around">
                  <Button color="primary"> Agregar Experiencia Vocacional</Button>
                  <Button> Remover Experiencia Vocacional</Button>
                  </Row>

                  <FormGroup>
                    <Label for="exampleText">Habilidades</Label>
                    <Input type="textarea" name="skills" id="skills" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleText">Palabras clave</Label>
                    <Input type="textarea" name="keywords" id="keywords" />
                  </FormGroup>
                  <Button>Submit</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
  }

  export default UploadForm;