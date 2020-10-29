import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Item, List, Segment } from 'semantic-ui-react';
import useFirestoreDoc from '../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { getStudent } from '../../app/services/firestoreService';
import PaysheetStudent from '../paysheet/PaysheetStudent';
import {listenStudent} from './studentActions';
import {format} from 'date-fns';

const Student = ({match}) => {
    const regexMiles = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    const dispatch = useDispatch();
    const {student} = useSelector(state => state.student); 
    const {loading} = useSelector(state => state.async);

    useFirestoreDoc({
        query: () => getStudent(match.params.id),
        data: student => dispatch(listenStudent(student)),
        dependency: [dispatch, match.params.id]
    })

    if(loading) return <LoadingComponent content='Cargando estudiante...' />

    return(
        <>
            <Segment>
                <Grid>
                    <Grid.Column width={12}>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={'/assets/images/user.png'} />
                                <Item.Content verticalAlign='middle'>
                                    <Header as='h1' style={{display: 'block', marginBottom: 10}}
                                        content={student?.lastName +', '+ student?.firstName}/>
                                        <h4>C&eacute;dula:  {student?.cedula.toString().replace(regexMiles, '.')}</h4>
                                        <h4>Curso:  {student?.classroom}</h4>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                </Grid>
                
            </Segment>
            {student && <>
                <PaysheetStudent student={student} />
                {student.payments?.reverse().map(m => (
                    <>
                        <h2>{m.month}</h2>
                        <List key={m} divided relaxed>
                            {m.transactions?.reverse().map(t => (
                                <List.Item>
                                <List.Icon name='dollar' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Description as='a'>
                                        <Grid columns={3} divided>
                                            <Grid.Column>
                                            <span style={{color: '#1e70bf'}}><strong>Pago: $</strong>{t.mount}</span>
                                                <br style={{margin: '5px'}} />
                                                <strong>Pago: Bs.</strong>{new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                                    .format(t.mount*t.rate).replace('BSF', '')}
                                            </Grid.Column>
                                            <Grid.Column>
                                                <strong>Fecha:</strong> {format(t.date.toDate(), 'dd MMM yyyy')}
                                                <br style={{margin: '5px'}} />
                                                <strong>Tasa: Bs.</strong>{new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                                    .format(t.rate).replace('BSF', '')}
                                            </Grid.Column>
                                        </Grid>
                                    </List.Description>
                                </List.Content>
                                </List.Item>
                        ))}
                        </List>
                    </>
                ))}
            </>}
        </>
    );
}

export default Student;
