import React, { useState, useEffect, useCallback } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Form, FormGroup, Input, Label, Button } from 'reactstrap';

Moment.locale('en')
momentLocalizer()

  const UploadForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState( '');
    const [municipality, setMunicipality] = useState('');
    const [curriculumState, setCurriculumState] = useState( '');
    const [city, setCity] = useState( '');
     const [educationExperience, setEducationExperience] = useState( [{educationInstitution: '', educationTitle: ''}]);
     const [telephones, setTelephones] = useState( ['']);
     const [workExperience, setWorkExperience] = useState(['']);
     const [languages, setLanguages] = useState(['']);
    useEffect(() => {
      const {firstName: firstNameExtracted, lastName: lastNameExtracted, email: emailExtracted, birthDate: birthDateExtracted, municipality: municipalityExtracted, city: cityExtracted, state: stateExtracted, language: languagesArray, educationData: educationArray, workData: workArray, telephones: telephonesArray } = props

      setFirstName(firstNameExtracted ? firstNameExtracted : '')
      setLastName(lastNameExtracted ? lastNameExtracted : '')
      setEmail(emailExtracted ? emailExtracted : '')
      setBirthDate(birthDateExtracted ? birthDateExtracted : '')
      setMunicipality(municipalityExtracted ? municipalityExtracted : '');
      setCurriculumState(stateExtracted ? stateExtracted : '');
      setCity(cityExtracted ? cityExtracted: '')
      setEducationExperience(educationArray ? educationArray : [{educationInstitution: '', educationTitle: ''}]);
      setTelephones(telephonesArray ? telephonesArray : ['']);
      setWorkExperience(workArray ? workArray : ['']);
      setLanguages(languagesArray ? languagesArray : ['']);
    }, [props.update])

    function removeLanguage() {
      let languagesCopy = [...languages];
      languagesCopy.pop();
      setLanguages(languagesCopy);
    }

    function modifyLanguage(modifiedLanguage, index) {
      let newArray = [...languages];
      newArray[index] = modifiedLanguage
      setLanguages(newArray)
    }

    function removeTelephone() {
      let telephonesCopy = [...telephones]
      telephonesCopy.pop();
      setTelephones(telephonesCopy);
    }

    function modifyTelephone(modifiedTelephone,index) {
      let newArray = [...telephones];
      newArray[index] = modifiedTelephone
      setTelephones(newArray)
    }

    function removeWorkExperience() {
      let workExperienceCopy = [...workExperience];
      workExperienceCopy.pop();
      setWorkExperience(workExperienceCopy)
    }

    function modifyWorkExperience(modifiedExperience, index) {
      let newArray = [...workExperience]
      newArray[index] = modifiedExperience;
      setWorkExperience(newArray)
    }

    function modifyEducationExperience(modifiedExperience, index) {
      let newArray = [...educationExperience];
      newArray[index] = modifiedExperience;
      setEducationExperience(newArray)
    }

    function removeEducationExperience() {
      let educationExperienceCopy = [...educationExperience];
      educationExperienceCopy.pop();
      setEducationExperience(educationExperienceCopy)
    }

    function uploadForm() {
      const curriculumData = {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        email: email,
        city: city,
        state: curriculumState,
        telephones: telephones,
        languages: languages,
        workExperience: workExperience,
        educationExperience: educationExperience,
        skills: props.skills,
        concepts: props.concepts,
        keywords: props.keywords,
        categories: props.categories
      }
      props.onSubmit(curriculumData)
    }

      return (
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
            <Card className="my-lg-5 my-md-4 my-3">
              <CardBody>
                <Form>
                  <CardTitle>
                    {' '}
                    <b> Información Personal </b>
                  </CardTitle>
                  <Row form>
                    <Col lg={6}>
                      <FormGroup>
                        <Label for="Nombres">Nombres</Label>
                        <Input
                          type="text"
                          name="Nombres"
                          value={firstName ? firstName : ''}
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
                          value={lastName ? lastName : ''}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="Email">Correo</Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="abc@correo.com"
                          value={email ? email : ''}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="birthDate"> Fecha de Nacimiento </Label>
                        <DateTimePicker
                          defaultCurrentDate={birthDate ? birthDate : null}
                          value={birthDate ? birthDate : null}
                          onChange={value => {
                            setBirthDate(value);
                          }}
                          time={false}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4}>
                      <FormGroup>
                        <Label for="Municipio">Municipio</Label>
                        <Input
                          type="text"
                          name="Municipio"
                          id="Municipio"
                          placeholder="Municipio"
                          value={municipality ? municipality : ''}
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
                          value={city ? city : ''}
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
                          value={curriculumState ? curriculumState : ''}
                          onChange={e => setCurriculumState(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <CardTitle>
                    <b>Idiomas </b>
                  </CardTitle>
                  {languages.map((language, i) => (
                    <FormGroup key={` ${i} `}>
                      <Label for={`language${i}`}> Idioma {i + 1}</Label>
                      <Input
                        type="text"
                        name={`Idioma${i}`}
                        id={`${language}${i}`}
                        placeholder="Inserte un idioma"
                        className="mb-3"
                        value={language}
                        onChange={e => {
                          modifyLanguage(e.target.value, i);
                        }}
                      />
                    </FormGroup>
                  ))}
                  <Row className="justify-content-around mb-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        setLanguages([...languages, '']);
                      }}
                    >
                      Agregar Idioma
                    </Button>
                    <Button
                      disabled={languages.length <= 1}
                      onClick={() => {
                        removeLanguage();
                      }}
                    >
                      Remover Idioma
                    </Button>
                  </Row>
                  <CardTitle>
                    <b> Teléfonos </b>
                  </CardTitle>
                  {telephones.map((telephone, i) => (
                    <div key={`telephone${i}`}>
                      <FormGroup>
                        <Label for={`telephone ${i + 1}`}>
                          Teléfono {i + 1}
                        </Label>
                        <Input
                          type="text"
                          name={`telephone${i}`}
                          id={`telephone${i}`}
                          className="mb-3"
                          value={telephone}
                          onChange={e => {
                            modifyTelephone(e.target.value, i);
                          }}
                          placeholder="Inserte un teléfono. Ej: +584122100011"
                        />
                      </FormGroup>
                    </div>
                  ))}
                  <Row className="justify-content-around mb-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        setTelephones([...telephones, '']);
                      }}
                    >
                      Agregar Telefono
                    </Button>
                    <Button
                      disabled={telephones.length <= 1}
                      onClick={() => {
                        removeTelephone();
                      }}
                    >
                      Remover Telefono
                    </Button>
                  </Row>
                  <FormGroup>
                    <CardTitle>
                      <b>Información Educativa</b>
                    </CardTitle>
                    {/* Need to think of custom IDs which do not depend on mutable elements from the data. */}
                    {educationExperience.map((education, i) => (
                      <div key={`education${i}`}>
                        <CardSubtitle> Educación {i + 1} </CardSubtitle>
                        <Row form>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="startDate"> Fecha Inicio </Label>
                              <DateTimePicker
                                defaultCurrentDate={
                                  education.startDate
                                    ? education.startDate
                                    : null
                                }
                                value={
                                  education.startDate
                                    ? education.startDate
                                    : null
                                }
                                onChange={value => {
                                  modifyEducationExperience(
                                    { ...education, startDate: value },
                                    i
                                  );
                                }}
                                time={false}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="endDate"> Fecha Culminación </Label>
                              <DateTimePicker
                                defaultCurrentDate={
                                  education.endDate ? education.endDate : null
                                }
                                value={
                                  education.endDate ? education.endDate : null
                                }
                                onChange={value => {
                                  modifyEducationExperience(
                                    { ...education, endDate: value },
                                    i
                                  );
                                }}
                                time={false}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="institution">
                                Institución Educativa
                              </Label>
                              <Input
                                type="text"
                                name="educationInstitution"
                                placeholder="Institución Educativa"
                                className="mb-3"
                                value={education.educationInstitution}
                                onChange={e => {
                                  modifyEducationExperience(
                                    {
                                      ...education,
                                      educationInstitution: e.target.value
                                    },
                                    i
                                  );
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="university title">
                                Título Universitario
                              </Label>
                              <Input
                                type="text"
                                name="university title"
                                placeholder="Título Universitario"
                                className="mb-3"
                                value={education.educationTitle}
                                onChange={e => {
                                  modifyEducationExperience(
                                    {
                                      ...education,
                                      educationTitle: e.target.value
                                    },
                                    i
                                  );
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="educationGrade">
                                Grado de educación (Opcional)
                              </Label>
                              <Input
                                type="text"
                                name="educationGrade"
                                placeholder="Grado de educación. Ej: TSU, Lic, etc."
                                className="mb-3"
                                value={education.educationGrade ? education.educationGrade : ''}
                                onChange={e => {
                                  modifyEducationExperience(
                                    {
                                      ...education,
                                      educationGrade: e.target.value
                                    },
                                    i
                                  );
                                }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </FormGroup>
                  <Row className="justify-content-around mb-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        setEducationExperience([
                          ...educationExperience,
                          { educationInstitution: '', educationTitle: '' }
                        ]);
                      }}
                    >
                      Agregar Experiencia Educativa
                    </Button>
                    <Button
                      disabled={educationExperience.length <= 1}
                      onClick={() => {
                        removeEducationExperience();
                      }}
                    >
                      Remover Experiencia Educativa
                    </Button>
                  </Row>
                  <CardTitle>
                    <b> Información Vocacional </b>
                  </CardTitle>
                  {workExperience.map((work, i) => (
                    <div key={`${work.workplace}-i`}>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="startDate"> Fecha Inicio </Label>
                            <DateTimePicker
                              defaultCurrentDate={
                                work.startDate ? work.startDate : null
                              }
                              value={
                                work.startDate ? work.startDate : null
                              }
                              onChange={value => {
                                modifyWorkExperience(
                                  { ...work, startDate: value },
                                  i
                                );
                              }}
                              time={false}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="startDate"> Fecha Culminación </Label>
                            <DateTimePicker
                              defaultCurrentDate={
                                work.endDate ? work.endDate : null
                              }
                              value={work.endDate ? work.endDate : null}
                              onChange={value => {
                                modifyWorkExperience(
                                  { ...work, endDate: value },
                                  i
                                );
                              }}
                              time={false}
                            />
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
                              value={work.workplace}
                              onChange={e => {
                                modifyWorkExperience(
                                  { ...work, workplace: e.target.value },
                                  i
                                );
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="work position">Posición laboral</Label>
                            <Input
                              type="text"
                              name="workExperience"
                              placeholder="Posición laboral"
                              className="mb-3"
                              value={work.workPosition}
                              onChange={e => {
                                modifyWorkExperience(
                                  { ...work, workPosition: e.target.value },
                                  i
                                );
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="Specialization">Especialización</Label>
                            <Input
                              type="text"
                              name="workExperience"
                              placeholder="Especialización"
                              className="mb-3"
                              value={work.workSpecialization}
                              onChange={e => {
                                modifyWorkExperience(
                                  {
                                    ...work,
                                    workSpecialization: e.target.value
                                  },
                                  i
                                );
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Row className="justify-content-around mb-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        setWorkExperience([
                          ...workExperience,
                          {
                            workPostion: '',
                            workSpecialization: '',
                            workplace: ''
                          }
                        ]);
                      }}
                    >
                      Agregar Experiencia Vocacional
                    </Button>
                    <Button
                      disabled={workExperience.length <= 1}
                      onClick={() => {
                        removeWorkExperience();
                      }}
                    >
                      Remover Experiencia Vocacional
                    </Button>
                  </Row>
                  <FormGroup>
                    <Label for="skills">Habilidades</Label>
                    <Input
                      type="textarea"
                      readOnly
                      name="skills"
                      id="skills"
                      value={props.skills ? props.skills.toString() : ''}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="keywords">Palabras clave</Label>
                    <Input
                      type="textarea"
                      readOnly
                      name="keywords"
                      id="keywords"
                      value={props.keywords ? props.keywords.toString() : ''}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="concepts">Conceptos</Label>
                    <Input
                      type="textarea"
                      readOnly
                      name="concepts"
                      id="concepts"
                      value={props.concepts ? props.concepts.toString() : ''}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="categories">Categorías</Label>
                    <Input
                      type="textarea"
                      readOnly
                      name="categories"
                      id="categories"
                      value={
                        props.categories ? props.categories.toString() : ''
                      }
                    />
                  </FormGroup>
                  <Button onClick={() => uploadForm()}>Submit</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
  }

  export default UploadForm;