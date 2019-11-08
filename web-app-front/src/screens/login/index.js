import React, { useState } from 'react';

import { Card, CardBody, CardTitle, Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';

import Firebase from '../../firebase';

import s from './login.module.scss';

const Login = ({ ...props }) => {

    const [isSignUp, setSignUp] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const handleOnSubmit = async e => {
        setLoading(true);
        e.preventDefault();
        try {
            isSignUp ? await Firebase.register(email, password, firstName, lastName) : await Firebase.signIn(email, password);
            props.navigate('../dashboard');
        } catch (e) {
            console.log(e);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        }
        setLoading(false);
    }

    return (
        <section className={s.root}>
            
            <aside className="col-sm-12 col-md-8 col-lg-6 mx-auto">
                <Card>
                    <CardBody>
                        <Button className="float-right" outline color='primary' onClick={() => setSignUp(!isSignUp)}>{isSignUp ? 'Iniciar sesión' : 'Registrarme'}</Button>
                        <CardTitle><h3>{isSignUp ? 'Registrarme' : 'Iniciar sesión'}</h3></CardTitle>
                        <hr />
                        <Form onSubmit={handleOnSubmit}>
                            {isSignUp && <>
                                <FormGroup>
                                    <Label>Primer nombre</Label>
                                    <Input
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        name="firstName" className="form-control" placeholder="John" type="text" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Primer apellido</Label>
                                    <Input
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        name="lastName" className="form-control" placeholder="Doe" type="text" />
                                </FormGroup></>}
                            <FormGroup>
                                <Label>Correo electrónico</Label>
                                <Input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    name="email" className="form-control" placeholder="ejemplo@ejemplo.com" type="email" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Contraseña</Label>
                                <Input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    name="password" className="form-control" placeholder="********" type="password" />
                            </FormGroup>
                            <FormGroup className={loading ? 'd-flex justify-content-center' : ''}>
                                {loading
                                    ? <Spinner color="primary" />
                                    : <button type="submit" className="btn btn-primary">{isSignUp ? 'Registrarme' : 'Iniciar sesión'}</button>
                                }
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </aside>
        </section>
    );
};

export default Login;