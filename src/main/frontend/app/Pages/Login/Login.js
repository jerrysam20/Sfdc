import React from 'react'
import logo from '../../assets/logo.png';
import {Button, Container, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import Row from "react-bootstrap/Row";

const LoginForm = () => (
    <Container>
        <Segment.Group>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 550 }}>
            <Header style={{ marginTop: -60 }} as='h2' color='red' textAlign='center'>
                <Image src={logo}/> Log-in to your account
            </Header>
            <Form size='large'>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />

                    <Button color='red' fluid size='large'>
                        Login
                    </Button>
                </Segment>
            </Form>
            <Message>
                New to us? <a href='#'>Sign Up</a>
            </Message>
        </Grid.Column>
    </Grid>
        </Segment.Group>
    </Container>

)

export default LoginForm