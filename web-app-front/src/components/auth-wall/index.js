import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';
import { Redirect } from '@reach/router';

import LoadingScreen from '../../screens/loading';


const AuthWall = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged(user => {
                user
                    ? setUser(user)
                    : setUser(null);
                setLoading(false);
            });
        return () => unsubscribe();
    });

    if (!loading) {
        if (user) {
            return children;
        } else {
            return <Redirect to="/login" noThrow />;
        }
    } else {
        return <LoadingScreen />
    }

}

export default AuthWall;
