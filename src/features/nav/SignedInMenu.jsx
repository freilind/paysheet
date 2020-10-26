import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Menu, Image, Dropdown, Button } from 'semantic-ui-react';
import { signOutFirebase } from '../../app/services/firebaseService';
import { openModal } from '../../app/common/modals/modalReducer';

const SignedInMenu = () => {
    const dispatch = useDispatch();
    const {currentUserProfile} = useSelector(state => state.profile);
    const history = useHistory();

    const hanldeSignOut = async () => {
        try {
            history.push('/');
            await signOutFirebase();
        } catch(error) {
            toast.error(error.message);
        }
    }

    return(
        <>
            <Menu.Item position='right'>
                <Button onClick={()=> dispatch(openModal({modalType: 'RegisterExchange'}))} basic inverted content='Tasa' />
             </Menu.Item>
            <Menu.Item position='right'>
                <Image avatar spaced='right' src={'/assets/images/user.png'} />
                <Dropdown pointing='top left' text={currentUserProfile?.displayName}>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={hanldeSignOut}
                            text='Sign out'
                            icon='power' />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </>
        
    );
}

export default SignedInMenu;
