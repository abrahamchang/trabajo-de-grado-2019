import React from 'react';

import { Router } from '@reach/router';

import AuthWall from '../components/auth-wall';

import Login from '../screens/login';
import Dashboard from '../screens/dashboard';
import Search from '../screens/search';
import Projects from '../screens/projects';
import CandidateDetail from '../screens/search/candidateDetail';
import ProjectDetails from '../screens/projects/ProjectDetails/';

const AppStack = () => {
    // const [uid, setUid] = useState(null);


    // useEffect(() => {
    //     const unsubscribe = firebase
    //         .auth()
    //         .onAuthStateChanged(newUser => {
    //             if (newUser) {
    //                 if (newUser.uid !== uid) {
    //                     setUid(newUser.uid)
    //                 }
    //             }
    //             else {
    //                 setUid(null)
    //             }
    //         });
    //     return () => unsubscribe();
    // });


    return (
        <>
        {/* {uid &&<Navbar/> } */}
    <Router>
        <Login path="/login" />
        {/* <Navbar path="/"/> */}
        <AuthWall path="/"  >
            <Dashboard path="dashboard" />

            <Search path="search" />
            <CandidateDetail path="search/:discoveryId" />

            <Projects path="projects" />
            <ProjectDetails path="projects/:proyectId" />
            <CandidateDetail path="projects/:proyectId/:candidateId"/>
        </AuthWall>
    </Router>
    </>
    )
};

export default AppStack;