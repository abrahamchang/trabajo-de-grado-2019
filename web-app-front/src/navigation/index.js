import React from 'react';
import { Router } from '@reach/router';

//import AuthWall from '../components/auth-wall';

import Login from '../screens/login';
import Dashboard from '../screens/dashboard';
import Search from '../screens/search';
import Proyects from '../screens/proyects';
import CandidateDetail from '../screens/search/candidateDetail';
import ProyectDetails from '../screens/proyects/ProyectDetails';
const Navigator = () => (
    <Router>
        <Login path='/' />

        {/* <AuthWall path='/'> */}
        <Dashboard path='dashboard' />
        <Search path='search'>
        <CandidateDetail path=":discoveryId"/>
        </Search>
        <Proyects path='proyects'>
        <ProyectDetails path=":proyectId"/>
        </Proyects>
        {/* </AuthWall> */}
    </Router>
);

export default Navigator;