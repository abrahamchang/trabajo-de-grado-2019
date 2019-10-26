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
     const [educationExperience, setEducationExperience] = useState( ['']);
     const [telephones, setTelephones] = useState( ['']);
     const [workExperience, setWorkExperience] = useState(['']);
     const [languages, setLanguages] = useState(['']);
    useEffect(() => {
      const {firstName: firstNameExtracted, lastName: lastNameExtracted, email: emailExtracted, birthDate: birthDateExtracted, municipality: municipalityExtracted, city: cityExtracted, state: stateExtracted, language: languagesArray, skills: skillsArray, educationData: educationArray, workData: workArray, telephones: telephonesArray } = props

      setFirstName(firstNameExtracted ? firstNameExtracted : '')
      setLastName(lastNameExtracted ? lastNameExtracted : '')
      setEmail(emailExtracted ? emailExtracted : '')
      setBirthDate(birthDateExtracted ? birthDateExtracted : '')
      setMunicipality(municipalityExtracted ? municipalityExtracted : '');
      setCurriculumState(stateExtracted ? stateExtracted : '');
      setCity(cityExtracted ? cityExtracted: '')
      setEducationExperience(educationArray ? educationArray : ['']);
      setTelephones(telephonesArray ? telephonesArray : ['']);
      setWorkExperience(workArray ? workArray : ['']);
      setLanguages(languagesArray ? languagesArray : ['']);
    }, [props.update])

    function removeLanguage() {
      let languagesCopy = [...languages];
      languagesCopy.pop();
      setLanguages(languagesCopy);
    }

    function removeTelephone() {
      let telephonesCopy = [...telephones]
      telephonesCopy.pop();
      setTelephones(telephonesCopy);
    }

    function removeWorkExperience() {
      let workExperienceCopy = [...workExperience];
      workExperienceCopy.pop();
      setWorkExperience(workExperienceCopy)
    }

    function removeEducationExperience() {
      let educationExperienceCopy = [...educationExperience];
      educationExperienceCopy.pop();
      setEducationExperience(educationExperienceCopy)
    }
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
                    <CardTitle><b>Idiomas </b> </CardTitle>
                    {languages.map((language, i) => (
                      <FormGroup>
                      <Label for={`language${i}`}> Idioma {i+1}</Label>
                      <Input
                        type="text"
                        name={`Idioma${i}`}
                        id={`${language}${i}`}
                        placeholder="Inserte un idioma"
                        className="mb-3"
                      />
                      </FormGroup>
                    ))
                  }
                  <Row className="justify-content-around mb-2">
                  <Button color="primary" onClick={() => {setLanguages([...languages, ''])}}> Agregar Idioma</Button>
                  <Button disabled={languages.length <= 1} onClick={() => {removeLanguage()}}> Remover Idioma</Button>
                  </Row>
                    <CardTitle> <b> Teléfonos </b></CardTitle>
                    {telephones.map((telephone, i) => (
                      <>
                      <FormGroup>
                      <Label for={`telephone ${i+1}`}> Teléfono {i + 1} </Label>
                      <Input
                        type="text"
                        name={`telephone${i}`}
                        id={`telephone${i}`}
                        className="mb-3"
                        value={telephone}
                        placeholder="Inserte un teléfono. Ej: +584122100011"
                      />
                      </FormGroup>
                      </>
                    ))}

                  <Row className="justify-content-around mb-2">
                  <Button color="primary" onClick={() => {setTelephones([...telephones, ''])}}> Agregar Telefono </Button>
                  <Button disabled={telephones.length <= 1} onClick={() => {removeTelephone()}}> Remover Telefono</Button>
                  </Row>
                  <FormGroup>
                    <CardTitle> <b>Información Educativa</b>  </CardTitle>
                    {educationExperience.map((education, i) => (
                <>
                <CardSubtitle >  Educación {i+1}  </CardSubtitle>
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
                  <Label for="institution"> Institución Educativa </Label>
                <Input
                  type="text"
                  name="educationInstitution"
                  placeholder="Institución Educativa"
                  className="mb-3"
                  value={education.educationInstitution}
                />
                </FormGroup>
                </Col>
                <Col md={4}>
                <FormGroup>
                <Label for="university title"> Título Universitario </Label>
                <Input
                  type="text"
                  name="university tite"
                  placeholder="Título Universitario"
                  className="mb-3"
                  value={education.educationTitle}
                />
                </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                  <Label for="educationGrade"> Grado de educación (Opcional) </Label>
                <Input
                  type="text"
                  name="educationGrade"
                  placeholder="Grado de educación. Ej: TSU, Lic, etc."
                  className="mb-3"
                />
                </FormGroup>
                </Col>
                  </Row>
                </>
                    ))}
                  </FormGroup>
                  <Row className="justify-content-around mb-2">
                  <Button color="primary" onClick={() => {setEducationExperience([...educationExperience, {}])}}> Agregar Experiencia Educativa</Button>
                  <Button disabled={educationExperience.length <= 1 } onClick={() => {removeEducationExperience()}}> Remover Experiencia Educativa</Button>
                  </Row>
                    <CardTitle> <b> Información Vocacional </b></CardTitle>
                    {workExperience.map((work, i) => (
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
                  </>
                    )) }
                  <Row className="justify-content-around mb-2">
                  <Button color="primary" onClick={() => {setWorkExperience([...workExperience, {}])}}> Agregar Experiencia Vocacional</Button>
                  <Button disabled={workExperience.length <= 1} onClick={() => {removeWorkExperience()}}> Remover Experiencia Vocacional</Button>
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