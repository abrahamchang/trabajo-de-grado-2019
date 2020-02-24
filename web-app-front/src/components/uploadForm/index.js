import React, { useState, useEffect } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Form, FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';

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
     const [age, setAge] = useState('')
     const [ageFlag, setAgeFlag] = useState(false)
     const [submitFlag, setSubmitFlag] = useState(false)
    useEffect(() => {

      const {firstName: firstNameExtracted, lastName: lastNameExtracted, email: emailExtracted, birthDate: birthDateExtracted, municipality: municipalityExtracted, city: cityExtracted, state: stateExtracted, languages: languagesArray, educationExperience: educationArray, workExperience: workArray, telephones: telephonesArray,  age: ageExtracted, ageFlag : ageFlagExtracted } = props;

      console.log(props)
      setFirstName(firstNameExtracted ? firstNameExtracted : '')
      setLastName(lastNameExtracted ? lastNameExtracted : '')
      setEmail(emailExtracted ? emailExtracted : '')
      setMunicipality(municipalityExtracted ? municipalityExtracted : '');
      setCurriculumState(stateExtracted ? stateExtracted : '');
      setCity(cityExtracted ? cityExtracted: '')
      setEducationExperience(educationArray ? educationArray : [{educationInstitution: '', educationTitle: ''}]);
      setTelephones(telephonesArray ? telephonesArray : ['']);
      setWorkExperience(workArray ? workArray : ['']);
      setLanguages(languagesArray ? languagesArray : ['']);
      if (birthDateExtracted || ageExtracted) {
      if (calculateAge(birthDateExtracted) >= 18 || ageExtracted >= 18 ) {
      setBirthDate(birthDateExtracted ? birthDateExtracted : '')
      setAge(ageExtracted ? ageExtracted : birthDateExtracted ? calculateAge(birthDateExtracted) : null);
      setAgeFlag(ageFlagExtracted ? ageFlagExtracted : false);
      }
      }
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
        courses: props.courses,
        skills: props.skills,
        concepts: props.concepts,
        keywords: props.keywords,
        categories: props.categories,
        age: age ? parseInt(age) : calculateAge(birthDate),
        workExperienceYears: calculateWorkingYears()
      }
      console.log(curriculumData)
      setSubmitFlag(true);
      if (firstName && lastName) {
      props.onSubmit(curriculumData)
      }
    }
    function calculateAge(newBirthDate) {
      console.log(newBirthDate)
      const today = Moment();
      const difference = today.diff(newBirthDate, 'years')
      setAgeFlag(false)
      return difference;
    }

    function calculateWorkingYears() {

      const findEarliestDate = (acc, curr) => {
        return acc.isAfter(Moment(curr.startDate)) ? Moment(curr.startDate) : acc;
      }

      const findLatestDate = (acc, curr) => {
        const compareDate = Moment(curr.endDate).isValid() ? Moment(curr.endDate) : Moment(curr.startDate).isValid() ? Moment(curr.startDate) : false;
        if (compareDate) {
        return acc.isBefore(compareDate) ? compareDate : acc;
        }
        else return acc;
      }

      // const  reducer = (acc, curr) => {
      //   const endDate = Moment(curr.endDate);
      //   endDate.is
      //   return acc + endDate.diff(Moment(curr.startDate), 'years', true)
      // }
      // return workExperience.reduce(reducer, 0);

      if (workExperience.length > 0 ) {
     const earliestDate = workExperience.reduce(findEarliestDate, Moment())
     const latestDate = workExperience.reduce(findLatestDate, Moment(workExperience[0].endDate))
     console.log(earliestDate)
     console.log(latestDate)
     const diff = latestDate.diff(earliestDate, 'years', true)
     return diff;
      }
      else return 0;
    }
      return (
        <Row className="justify-content-center">
          <Col lg={12} className="d-flex flex-column">
            <Card className="my-lg-5 my-md-4 my-3">
              <CardBody>
                <Form>
                  <CardTitle>

                    <b> Información Personal </b>
                  </CardTitle>
                  <Row form>
                    <Col lg={6}>
                      <FormGroup>
                        <Label for="Nombres">Nombres</Label>
                        <Input
                        invalid={submitFlag && !firstName}
                          type="text"
                          name="Nombres"
                          value={firstName ? firstName : ''}
                          onChange={e => {
                            if (submitFlag) setSubmitFlag(false);
                            setFirstName(e.target.value)
                          }}
                          id="nombres"
                          placeholder="Luciano"
                          disabled={props.readOnly}
                        />
                                <FormFeedback>Por favor, inserte un nombre</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Label for="Apellidos">Apellidos</Label>
                        <Input
                        invalid={submitFlag && !lastName}
                          type="text"
                          name="Apellidos"
                          id="apellidos"
                          placeholder="Pinedo"
                          value={lastName ? lastName : ''}
                          onChange={e =>
                            {
                              if (submitFlag) setSubmitFlag(false);
                              setLastName(e.target.value)
                            }

                          }
                          disabled={props.readOnly}
                        />
                                                        <FormFeedback>Por favor, inserte un apellido</FormFeedback>
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
                          disabled={props.readOnly}
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
                            setAge(calculateAge(value));
                          }}
                          time={false}
                          disabled={props.readOnly}
                        />
                        {ageFlag ? <sub> *Extraído mediante edad. Utilizando primer día de ese año. </sub> : null}
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
                          disabled={props.readOnly}
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
                          disabled={props.readOnly}
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
                          disabled={props.readOnly}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md ={12}>
                    {birthDate && <p> Edad: <b> {age} años</b> {ageFlag ? '(Extraído del documento)' : ''} </p>}
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
                        disabled={props.readOnly}
                      />
                    </FormGroup>
                  ))}
                  {!props.readOnly && <Row className="justify-content-around mb-2">
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
                  </Row>}
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
                          disabled={props.readOnly}
                        />
                      </FormGroup>
                    </div>
                  ))}
                  {!props.readOnly && <Row className="justify-content-around mb-2">
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
                  </Row>}
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
                                disabled={props.readOnly}
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
                                readOnly={props.readOnly}
                                disabled={props.readOnly}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md={6}>
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
                                disabled={props.readOnly}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="university title">
                                Título
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
                                disabled={props.readOnly}
                              />
                            </FormGroup>
                          </Col>
                          {/* <Col md={4}>
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
                                disabled={props.readOnly}
                              />
                            </FormGroup>
                          </Col> */}
                        </Row>
                      </div>
                    ))}
                  </FormGroup>
                  {!props.readOnly && <Row className="justify-content-around mb-2">
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
                  </Row>}
                  <CardTitle>
                    <b> Información Vocacional </b>
                  </CardTitle>
                  {workExperience.map((work, i) => (
                    <div key={`work-${i}`}>
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
                              disabled={props.readOnly}
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
                              disabled={props.readOnly}
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
                              value={work ? work.workplace : ''}
                              onChange={e => {
                                modifyWorkExperience(
                                  { ...work, workplace: e.target.value },
                                  i
                                );
                              }}
                              disabled={props.readOnly}
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
                              value={work ? work.workPosition : ''}
                              onChange={e => {
                                modifyWorkExperience(
                                  { ...work, workPosition: e.target.value },
                                  i
                                );
                              }}
                              disabled={props.readOnly}
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
                              value={work ? work.workSpecialization : ''}
                              onChange={e => {
                                modifyWorkExperience(
                                  {
                                    ...work,
                                    workSpecialization: e.target.value
                                  },
                                  i
                                );
                              }}
                              disabled={props.readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  ))}
               {!props.readOnly && <Row className="justify-content-around mb-2">
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
                  </Row>}
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
                    <Label for="courses">Cursos</Label>
                    <Input
                      type="textarea"
                      readOnly
                      name="courses"
                      id="courses"
                      value={
                        props.courses ? props.courses.toString() : ''
                      }
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
                  {!props.readOnly && <Button onClick={() => uploadForm()}>Submit</Button>}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
  }

  export default UploadForm;