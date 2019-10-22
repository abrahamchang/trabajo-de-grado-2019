
import React, { useState, useCallback } from 'react';

import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, FormText, Input, Label, Button } from 'reactstrap';

  const uploadForm = () => {
    //  const [educationExperience, setEducationExperience] = useState([])
    //  const [telephones, setTelephones] = useState([])
    //  const [workExperience, setWorkExperience] = useState([])
    //  const [languagues, setLanguagues] = useState([]);
    const educationExperience = ['a','b']
    const workExperience = ['c', 'd']
    const phones = ['e, f']
    const languagues = ['Español', 'Inglés']
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
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="Idiomas">Idiomas</Label>
                    {languagues.map((languague, i) => (
                      <Input
                        type="text"
                        name={`Idioma${i}`}
                        id={`Idioma${i}`}
                        placeholder={languague}
                        className="mb-3"
                      />
                    ))}
                    <Button> Agregar Idioma</Button>
                  </FormGroup>
                  <FormGroup>
                    <Label for="Idiomas">Teléfonos</Label>
                    {phones.map((telephone, i) => (
                      <Input
                        type="text"
                        name={`telephone${i}`}
                        id={`telephone${i}`}
                        placeholder={telephone}
                        className="mb-3"
                      />
                    ))}
                    <Button> Agregar Teléfono</Button>
                  </FormGroup>
                  <FormGroup>
                    <Label for="Idiomas">Información Educativa</Label>
                    {educationExperience.map((education, i) => (
                      <Input
                        type="text"
                        name={`education${i}`}
                        id={`education${i}`}
                        placeholder={education}
                        className="mb-3"
                      />
                    ))}
                    <Button> Agregar Experiencia Educativa</Button>
                  </FormGroup>
                  <FormGroup>
                    <Label for="Idiomas">Información Vocacional</Label>
                    {workExperience.map((work, i) => (
                      <Input
                        type="text"
                        name={`work${i}`}
                        id={`work${i}`}
                        placeholder={work}
                        className="mb-3"
                      />
                    ))}
                    <Button> Agregar Experiencia Vocacional</Button>
                  </FormGroup>
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

  export default uploadForm;