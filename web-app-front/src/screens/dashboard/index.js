import React, { useState, useCallback } from 'react';

import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

import { useDropzone } from 'react-dropzone';

import FileUploadIcon from './icons/FileUpload.svg';

import Firebase from '../../firebase';

import Resume from './resume';

import s from './dashboard.module.scss';

const Dashboard = () => {
    const [fileComponents, setFileComponents] = useState([]);

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