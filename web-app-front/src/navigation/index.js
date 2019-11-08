import React from 'react';
import { Router } from '@reach/router';

//import AuthWall from '../components/auth-wall';

import Login from '../screens/login';
import Dashboard from '../screens/dashboard';
import Search from '../screens/search';
import Projects from '../screens/Projects';
import CandidateDetail from '../screens/search/candidateDetail';
import ProjectDetails from '../screens/Projects/ProjectDetails/';
const Navigator = () => (
    <Router>
        <Login path='/' />

        {/* <AuthWall path='/'> */}
        <Dashboard path='dashboard' />
        <Search path='search'>
        <CandidateDetail path=":discoveryId"/>
        </Search>
        <Projects path='projects'>
        <ProjectDetails path=":projectId"/>
        </Projects>
        {/* </AuthWall> */}
    </Router>
);

export default Navigator;