import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';

const HomePage = () => {
    const dispatch = useDispatch();
    const {authenticated} = useSelector(state => state.auth);
    const history = useHistory();

    if(authenticated) history.push('/dashboard');

    return(
        <>
            {!authenticated &&
                <Segment inverted textAlign='center' vertical className='masthead'>
                    <Container>
                        <Header as='h1' inverted>
                            <Image size='massive' src='/assets/images/logo.png' style={{marginBottom: 12}} />
                            N&oacute;mina
                        </Header>
                        <Button 
                            onClick={()=>  {
                                dispatch(openModal({modalType: 'LoginForm'}));
                            }}
                            basic inverted content='Login' >
                            Login <Icon name='right arrow' inverted />
                        </Button>
                    </Container>
                </Segment>
            }
        </>
        
    );
}

export default HomePage;
