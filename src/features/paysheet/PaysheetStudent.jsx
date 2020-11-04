import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import PaysheetBs from './PaysheetBs';
import PaysheetUs from './PaysheetUs';
import LoadingComponent from '../../app/layout/LoadingComponent';

const PaysheetStudent = ({student}) => {
    const {loading} = useSelector(state => state.async);

    const arr= [];
    arr.push(student);
    const paysheets = [
        { menuItem: `Dollar`, render: () => <Tab.Pane> <PaysheetUs students={arr} /> </Tab.Pane> },
        { menuItem: `Bolivar`, render: () => <Tab.Pane> <PaysheetBs students={arr} /> </Tab.Pane> }
    ]

    if(loading) return <LoadingComponent content='Cargando n&oacute;mina ...' />

    return(
        <>
            <Tab panes={paysheets} />
        </>
    );
}

export default PaysheetStudent;
