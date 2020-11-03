import React, { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Divider, Icon, Input, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import Modalwrapper from '../../app/common/modals/ModalWrapper';
import { addPayment } from '../../app/services/firestoreService';
import { closeModal } from '../../app/common/modals/modalReducer';
import { Formik, Form } from 'formik';
import MyDateInput from '../../app/common/form/MyDateInput';

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
                        await addPayment(student.id, values);
                        dispatch(closeModal());
                    } catch(error) {
                        setErrors({auth: 'Problemas con el registro del pago.'});
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
