import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import Modalwrapper from '../../app/common/modals/ModalWrapper';
import { addExchange } from '../../app/services/firestoreService';
import { closeModal } from '../../app/common/modals/modalReducer';
import { Formik, Form } from 'formik';
import MyDateInput from '../../app/common/form/MyDateInput';
import { toast } from 'react-toastify';

const RegisterExchange = () => {
    const dispatch = useDispatch();

    return (
        <Modalwrapper size='mini' header='Registrar tasa de cambio'>
            <Formik
                initialValues={{buy: 0 , sale: 0, date: new Date()}}
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                        await addExchange(values);
                        toast.done('Tasa registrada.');
                        dispatch(closeModal());
                    } catch(error) {
                        setErrors({auth: 'Problem with rate exchange'});
                        toast.error('Problemas con el registro de la tasa.');
                    }finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className='ui form' >
                        <MyTextInput label='Compra' name='buy' type='number' min='1' step="0.01" placeholder='Valor compra' required />
                        <MyTextInput label='Venta' name='sale' type='number' min='1' step="0.01" placeholder='Valor venta' required />
                        <MyDateInput
                            label='Fecha'
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

export default RegisterExchange;
