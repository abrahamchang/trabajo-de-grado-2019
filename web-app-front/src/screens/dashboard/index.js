import React, { useState, useCallback } from 'react';

import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

import { useDropzone } from 'react-dropzone';

import FileUploadIcon from './icons/FileUpload.svg';

import Firebase from '../../firebase';

import Resume from './resume';

import s from './dashboard.module.scss';

const Dashboard = () => {
    const [fileComponents, setFileComponents] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        const resumes = acceptedFiles.map((file, index) => {

            //const requestAll = Llamar a la Function aqui

            //Aqui se carga a Firebase
            const uploadTask = Firebase.uploadFile(file);            
            return <Resume key={`resumes-${index}`} uploadTask={uploadTask} file={file} />
        });

        setFileComponents(resumes);
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