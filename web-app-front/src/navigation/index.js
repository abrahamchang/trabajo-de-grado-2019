import React from 'react';

import { Router } from '@reach/router';

import AuthWall from '../components/auth-wall';

import Login from '../screens/login';
import Dashboard from '../screens/dashboard';
import Search from '../screens/search';
import Projects from '../screens/projects';
import CandidateDetail from '../screens/search/candidateDetail';
import ProjectDetails from '../screens/projects/ProjectDetails/';
import Navbar from '../components/navbar'
const AppStack = () => (
    <Router>
        <Login path="/login" />
        <AuthWall path="/" >
            <Dashboard path="dashboard" default />

            <Search path="search" />
            <CandidateDetail path="search/:discoveryId" />

            <Projects path="projects" />
            <ProjectDetails path="projects/:proyectId" />
            <CandidateDetail path="projects/:proyectId/:candidateId"/>
        </AuthWall>
    </Router>
);

export default AppStack;