import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';

const SignedOutMenu = () => {
    const dispatch = useDispatch();
    return(
        <Menu.Item position='right'>
            <Button onClick={()=> dispatch(openModal({modalType: 'LoginForm'}))} basic inverted content='Login' />
        </Menu.Item>
    );
}

export default SignedOutMenu;
