import React from 'react';
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react';

const HomePage = ({history}) => {
    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/images/logo.png' style={{marginBottom: 12}} />
                    N&oacute;mina
                </Header>
                <Button onClick={() => history.push('/dashboard')} size='huge' inverted>
                    Comenzar
                    <Icon name='right arrow' inverted />
                </Button>
            </Container>
        </Segment>
    );
}

export default HomePage;
