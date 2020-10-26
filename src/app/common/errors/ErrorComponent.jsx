import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';

const ErrorComponent = () => {
    const {error} = useSelector(state => state.async);

    return(
        <Segment placeholder>
            <Header textAlign='center' content={error?.messsage || 'Ooops- ocurrio un error'} />
            <Button as={Link} to='/dashboard' primary style={{marginTop:20}} content='Regresar al dashboard ' />
        </Segment>
    )
}

export default ErrorComponent;
