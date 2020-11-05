import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Header, Item, List, Segment } from 'semantic-ui-react';
import useFirestoreDoc from '../../app/hooks/useFirestoreDoc';
import { getStudent } from '../../app/services/firestoreService';
import PaysheetStudent from '../paysheet/PaysheetStudent';
import {listenStudent} from './studentActions';
import {format} from 'date-fns';
import { openModal } from '../../app/common/modals/modalReducer';

const Student = ({match}) => {
    const regexMiles = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    const dispatch = useDispatch();
    const {student} = useSelector(state => state.student); 
    const {paymentsStudent} = useSelector(state => state.payment);

    useFirestoreDoc({
        query: () => getStudent(match.params.id),
        data: student => dispatch(listenStudent(student)),
        dependency: [dispatch, match.params.id]
    })

    return(
        <>
            <Segment>
                <Grid>
                    <Grid.Column width={8}>
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
                    <Grid.Column style={{display: 'flex', 'alignSelf': 'center'}} width={4}>
                        <Button
                        onClick={()=> dispatch(openModal({modalType: 'Payment'}))} 
                        primary
                        size='large'
                        fluid content='Pagar' />
                    </Grid.Column>
                </Grid>
                
            </Segment>
            {student && <>
                <PaysheetStudent student={student} />
                <List divided relaxed>
                {paymentsStudent?.sort((a, b) => a.date <= b.date).map(p => (
                    <>
                        <List.Item key={p.id}>
                        <List.Icon name='dollar' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Description as='a'>
                                <Grid columns={3} divided>
                                    <Grid.Column>
                                    <span style={{color: '#1e70bf'}}><strong>Pago: $</strong>{p.mount}</span>
                                        <br style={{margin: '5px'}} />
                                        <strong>Pago: Bs.</strong>{new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                            .format(p.mount * p.rate).replace('BSF', '')}
                                    </Grid.Column>
                                    <Grid.Column>
                                        <strong>Fecha:</strong> {format(p.date, 'dd MMM yyyy')}
                                        <br style={{margin: '5px'}} />
                                        <strong>Tasa: Bs.</strong>{new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                            .format(p.rate).replace('BSF', '')}
                                    </Grid.Column>
                                </Grid>
                            </List.Description>
                        </List.Content>
                        </List.Item>
                    </>
                ))}
                </List>
            </>}
        </>
    );
}

export default Student;
