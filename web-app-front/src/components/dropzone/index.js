import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';

import s from './dropzone.module.scss';

const Dropzone = () => {

    /* const onDrop = useCallback(acceptedFiles => {
        console.log('Acepted files', acceptedFiles);

    }, []); */

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className={s.root} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive
                ? <p>Drop the files here...</p>
                : <p>Drag n drop some files here, or click to select files</p>
            }
        </div>
    );
};

export default Dropzone;