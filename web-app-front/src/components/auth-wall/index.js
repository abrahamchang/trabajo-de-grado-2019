import React, { useState, useEffect } from 'react';

import Firebase from '../../firebase';

import { Redirect } from '@reach/router';

const AuthWall = ({ children }) => {
    const [isLogged, setIsLogged] = useState(Firebase.isLogged);
    const [hasTimedOut, setHasTimedOut] = useState(false);
    const [timeout, _setTimeout] = useState();

    useEffect(() => {
        const timeout = setTimeout(() => setHasTimedOut(true), 5000);
        if (timeout === undefined) {
            _setTimeout(timeout);
        }
        const unsubscribe = Firebase.subscribeToAuthChange(setIsLogged);

        return () => {
            clearTimeout(timeout);
            unsubscribe();
        }
    }, []);

    if (isLogged === true) {
        clearTimeout(timeout);
        return children;

    } else if (isLogged === undefined && !hasTimedOut) {
        return null;
    }
    return <Redirect to="/" noThrow />
};

export default AuthWall;