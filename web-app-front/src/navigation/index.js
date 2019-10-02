import React from 'react';
import { Router } from '@reach/router';

import AuthWall from '../components/auth-wall';

import Login from '../screens/login';
import Dashboard from '../screens/dashboard';
import Search from '../screens/search';
import Admin from '../screens/admin';

const Navigator = () => (
    <Router>
        <Login path='/' />

        {/* <AuthWall path='/'> */}
        <Dashboard path='dashboard' />
        <Search path='search' />
        <Admin path='admin' />
        {/* </AuthWall> */}
    </Router>
);

export default Navigator;