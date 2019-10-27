import React, { useState, useEffect } from 'react';

import { Row, Col, Progress } from 'reactstrap';

const Resume = ({ uploadTask, file }) => {
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState('');

    useEffect(() => {
        uploadTask.on('state_changed', snap => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, error => {
            console.log(error.message);
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                setUrl(downloadURL);
            });
        });

    })

    const { name, size } = file;

    return (
        <Row>
            <Col lg={4} className='text-truncate'>{name}</Col>
            <Col lg={4}><Progress animated value={progress}>{progress === 100 ? 'Carga exitosa!' : ''}</Progress></Col>
            <Col lg={4}>{(size / (1024 * 1024)).toFixed(2)} MB</Col>
        </Row>
    );
};

export default Resume;