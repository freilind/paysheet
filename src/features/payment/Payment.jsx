import React, { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Divider, Icon, Input, Label } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import MyTextInput from '../../app/common/form/MyTextInput';
import Modalwrapper from '../../app/common/modals/ModalWrapper';
import { addPayment, getExchange } from '../../app/services/firestoreService';
import { closeModal } from '../../app/common/modals/modalReducer';
import { Formik, Form } from 'formik';
import MyDateInput from '../../app/common/form/MyDateInput';
import { getDocFirebase } from '../../app/common/util/util';

const Payment = () => {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const {student} = useSelector(state => state.student); 
    const handleToggleClick = () => setToggle((prevState) => (!prevState))

    return (
        <Modalwrapper size='mini' header='Registrar Pago' >
            <Formik
                initialValues={{mount: 0 , date: new Date()}}
                validationSchema={Yup.object({
                    mount: Yup.number().moreThan(0, 'Pago tiene que ser mayor de Cero').required('Pago es requerido.'),
                    date: Yup.date().required()
                })}
                
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                        const rate = await getDocFirebase(getExchange(values.date));
                        if(rate && rate.sale) {
                            await addPayment(student, values, rate.sale);
                            toast.done('Pago registrado.');
                            dispatch(closeModal());
                            
                        } else {
                            toast.error('No hay tasa registrada para la fecha seleccionada.');
                        }
                        
                    } catch(error) {
                        setErrors({payment: 'Problemas con el registro del pago.'});
                        toast.error('Problemas con el registro del pago.');
                        setSubmitting(false);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className='ui form' >
                        <Button style={{'marginBottom': '4px'}} toggle active={toggle} onClick={handleToggleClick}>
                            {toggle ? 'Dollar' : 'Bolivares' }
                        </Button>
                        <MyTextInput name='mount' placeholder='Cantidad...' required />
                    
                        <MyDateInput 
                            name='date'
                            placeholder_Text='Date'
                            dateFormat='d MMMM, yyyy'
                        />
                        {errors.auth && 
                            <Label 
                                basic color='red'
                                style={{marginBottom: 10}}
                                content={errors.auth} />
                        }
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Registrar'
                        />
                    </Form>
                )}
            </Formik>
        </Modalwrapper>
    )
}

export default Payment;
