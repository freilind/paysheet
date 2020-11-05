import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import LoginForm from '../../features/auth/LoginForm';

const PrivateRoute = ({
    component: Component,
    prevLocation,
    ...rest
}) => {
    const {authenticated} = useSelector(state => state.auth);
    return(
        <Route
            {...rest}
            render={(props) => 
                    authenticated ? <Component {...props} /> : <LoginForm {...props}/> }
        />
    )
}

export default PrivateRoute;
