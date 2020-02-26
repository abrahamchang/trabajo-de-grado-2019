import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';
import { Redirect } from '@reach/router';

import LoadingScreen from '../../screens/loading';
import Navbar from '../navbar';

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
    // return (<>
    // <Navbar/>
    // {loading && <LoadingScreen/> }
    // {(!loading && user) ? children : <Redirect to="/login" noThrow />}
    // </>
    // )
    return (
        <>
        <Navbar/>
        {!loading && user && children }
        {!loading && !user && <Redirect to="/login" noThrow />}
        {loading && <LoadingScreen/>}
       {/* { !loading && user ? children : !loading && !user ? <Redirect to="/login" noThrow /> : <LoadingScreen />} */}
       </>
    )
    // if (!loading) {
    //     return (<>
    //     <Navbar/>
    //     {user ? children : <Redirect to="/login" noThrow />}
    //     </>)
    //     // if (user) {
    //     //     return children;
    //     // } else {
    //     //     return <Redirect to="/login" noThrow />;
    //     // }
    // } else {
    //     return <LoadingScreen />
    // }

}

export default AuthWall;
