import React, {useEffect, useState} from 'react';

import { Location } from '@reach/router';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import Firebase from '../../firebase';


const MainNavbar = (props) => {
    const [user, setUser] = useState('Usuario')
    //Temporary solution
    function findActiveKey(string) {
        const root = string.split('/')
        return '/' + root[1];
    }
    useEffect(() => {
        console.log(Firebase.getDisplayName())
        if (Firebase.getDisplayName() && Firebase.getDisplayName !== user) setUser(Firebase.getDisplayName())
    }, [Firebase.getDisplayName()])
    return (
        <Location>
            {({ location }) => (
                <Navbar className="shadow-lg" collapseOnSelect expand="lg" bg="light">
                    <Container className="justify-content-center">
                        <Navbar.Brand href="/">LuCha Repo</Navbar.Brand>
                        {(location.pathname !== '/') && <>
                            <Navbar.Toggle aria-controls="navbar-wrapper" />
                            <Navbar.Collapse id="navbar-wrapper">
                                <Nav activeKey={findActiveKey(location.pathname)}>
                                    <Nav.Link href="/dashboard" >Tablero</Nav.Link>
                                    <Nav.Link href="/search" >Búsquedas</Nav.Link>
                                    <Nav.Link href="/projects" >Proyectos</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            <Nav>
                                <NavDropdown title={user} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => Firebase.logout()}>Cerrar sesión</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>}
                    </Container>
                </Navbar>
            )}
        </Location>

    )

};

export default MainNavbar;