import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

const NavBar = ({setFormOpen}) => {
    const {authenticated} = useSelector(state => state.auth);
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight:'15px'}}/>
                    N&oacute;mina
                </Menu.Item>
                <Menu.Item as={NavLink} to='/dashboard'  name='Dashboard' />
                {authenticated 
                    ? <SignedInMenu  /> 
                    : <SignedOutMenu  />
                }
            </Container>
        </Menu>
    );
}

export default NavBar;
