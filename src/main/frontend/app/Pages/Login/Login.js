import React from 'react'
import logo from '../../assets/logo.png';
import {Button, Container, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'


export default class LoginForm extends React.Component {
constructor(props) {
    super(props);
    this.state = {}

}
handleSubmit = event => {
        this.setState({
            isLoading: true
        });
       var jsonData={
           "firstName":"",
           "lastName":"",
           "id":"jerrysam20@gmail.com",
           "password":"admin123",
           "phoneNumber":0
       };
        const endPoint = '/validateUser';
        fetch(endPoint, {
            method: 'post',
            body: JSON.stringify(jsonData),
            dataType: "json",
            headers: new Headers({'content-type': 'application/json'}),
        })
            .then(res => res.toString() === "true")
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });

                        // eslint-disable-next-line react/prop-types
                        this.props.history.push('/orders', {
                            reportData: result,
                            mode: this.state.mode
                        });

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    window.location.href = '/error';
                }
            );
        event.preventDefault();
    };
    render() {
        return (

            <Container>
                <Segment.Group>
                    <Grid textAlign='center' style={{height: '70vh'}} verticalAlign='middle'>
                        <Grid.Column style={{maxWidth: 550}}>
                            <Header style={{marginTop: -60}} as='h2' color='red' textAlign='center'>
                                <Image src={logo}/> Log-in to your account
                            </Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                    />
                                    <Message
                                        error
                                        header='Action Forbidden'
                                        content='You can only sign up for an account once with a given e-mail address.'
                                    />

                                    <Button color='red' fluid size='large' onClick={this.handleSubmit}>
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
    }
}


