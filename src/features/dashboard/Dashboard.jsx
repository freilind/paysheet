import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Classrooms from './classrooms/Classrooms';

const Dashboard = ({history}) => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.async);
    return(
        <>
            <Classrooms />
        </>
    );
}

export default Dashboard;
