import React, { useState, useCallback } from 'react';

import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, FormText, Input, Label, Button } from 'reactstrap';

import { useDropzone } from 'react-dropzone';

import FileUploadIcon from './icons/FileUpload.svg';

import Firebase from '../../firebase';

import Resume from './resume';

import s from './dashboard.module.scss';

const Dashboard = () => {
    const [fileComponents, setFileComponents] = useState([]);
    const [languagues, setLanguagues] = useState(['Español', 'Ingles'])
    const onDrop = useCallback(  (acceptedFiles) => {
        const fileRequests = [];
        const resumes = acceptedFiles.map((file, index) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                var b64 = reader.result.replace(/^data:.+;base64,/, '');
                const url = 'https://us-south.functions.cloud.ibm.com/api/v1/web/lucianopinedo%40gmail.com_dev/default/curriculumUpload'
                const postParams = {
                    method: 'POST',
                    body: b64,
                }
                try {
                const analysisResponse = await fetch(url, postParams);
                const data = await analysisResponse.json();
                fileRequests.push(data)
                index + 1 === acceptedFiles.length && console.log(fileRequests)
                } catch(err) {
                    console.log(err)
                }
            }
            //Enviar a Watson
            reader.readAsDataURL(file);

            //Aqui se carga a Firebase
            const uploadTask = Firebase.uploadFile(file);
            return <Resume key={`resumes-${index}`} uploadTask={uploadTask} file={file} />
        });
        setFileComponents(resumes);
        // for (const file of acceptedFiles) {
        //     reader.readAsDataURL(file)
        //     reader.read
        // }
    }, []);

    const uploadForm = () => {
      const educationExperience = ['a','b']
      const workExperience = ['c', 'd']
      const phones = ['e, f']
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

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop });

    return (
        <div className={s.root}>
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={8} className='d-flex flex-column'>
                        <Card className='my-lg-5 my-md-4 my-3'>
                            <CardBody>
                                <CardTitle className='text-center'><h3>Cargar Currículos</h3></CardTitle>
                                <hr />
                                <div {...getRootProps({
                                    className: `
                                    ${s.dropzone}
                                    ${isDragActive && s.dropzoneActive}
                                    ${isDragAccept && s.dropzoneAccept}
                                    ${isDragReject && s.dropzoneReject}
                                    `})}>
                                    <input {...getInputProps()} />
                                    <img className={s.uploadIcon} src={FileUploadIcon} alt="File upload icon." />
                                    <h5>Arrastre los documentos aquí o Haga clic.</h5>
                                    <p className="h6">Solo formatos PDF o DOC.</p>
                                </div>
                            </CardBody>
                        </Card>
                        {uploadForm()}
                        {fileComponents.length > 0 && (
                            <Card>
                                <CardBody>
                                    <CardTitle className='text-center'><h3>Vista Previa</h3></CardTitle>
                                    <hr />
                                    <Container>
                                        {fileComponents}
                                    </Container>
                                </CardBody>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;