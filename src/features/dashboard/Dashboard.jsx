import React from 'react';
import { useSelector } from 'react-redux';
import Classrooms from './classrooms/Classrooms';

const Dashboard = ({history}) => {
    const {loading} = useSelector(state => state.async);

    return(
        <>
            <Classrooms />
        </>
    );
}

export default Dashboard;
