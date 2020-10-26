import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Button, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import Modalwrapper from '../../app/common/modals/ModalWrapper';
import MyDateInput from '../../app/common/form/MyDateInput';
import { addExchange } from '../../app/services/firestoreService';
import { closeModal } from '../../app/common/modals/modalReducer';
import { Formik, Form } from 'formik';

const RegisterExchange = () => {
    const dispatch = useDispatch();
    return (
        <Modalwrapper size='mini' header='Registrar tasa de cambio'>
            <Formik
                initialValues={{buy: 0 , sale: 0, date: new Date()}}
                validationSchema={Yup.object({
                    buy: Yup.number().moreThan(300000).required(),
                    sale: Yup.number().moreThan(300000).required(),
                    date: Yup.date().required()
                })}
                
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                        await addExchange(values);
                        setSubmitting(false);
                        dispatch(closeModal());
                    } catch(error) {
                        setErrors({auth: 'Problem with rate exchange'});
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className='ui form' >
                        <MyTextInput name='buy' placeholder='Valor compra' />
                        <MyTextInput name='sale' placeholder='Valor venta' />
                        <MyDateInput 
                            name='date'
                            placeholder_Text='Date'
                            showTimeSelect
                            dateFormat='MMMM d, yyyy'
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
