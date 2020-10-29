import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreCollection from '../../app/hooks/useFirestoreCollection';
import { Tab } from 'semantic-ui-react';
import PaysheetBs from './PaysheetBs';
import PaysheetUs from './PaysheetUs';
import { listenToStudents } from '../students/studentActions';
import { listenToStudentsFromFirestore } from '../../app/services/firestoreService';
import LoadingComponent from '../../app/layout/LoadingComponent';

const Paysheet = ({match}) => {
    const dispatch = useDispatch();
    const {students} = useSelector(state => state.student);
    const {loading} = useSelector(state => state.async);

    useFirestoreCollection({
        query: () => listenToStudentsFromFirestore(match.params.id),
        data: students => dispatch(listenToStudents(students)),
        dependency: [match.params.id, dispatch]
    });

    const paysheets = [
        { menuItem: `${match.params.id} Dollar`, render: () => <Tab.Pane> <PaysheetUs students={students} /> </Tab.Pane> },
        { menuItem: `${match.params.id} Bolivar`, render: () => <Tab.Pane> <PaysheetBs students={students} /> </Tab.Pane> }
    ]

    if(loading) return <LoadingComponent content='Cargando n&oacute;mina ...' />

    return(
        <>
            <Tab panes={paysheets} />
        </>
    );
}

export default Paysheet;
