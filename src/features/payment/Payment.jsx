import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Label } from 'semantic-ui-react';
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
    const {student} = useSelector(state => state.student);

    return (
        <Modalwrapper size='mini' header='Registrar Pago' >
            <Formik
                initialValues={{mount: 0 , date: new Date()}}
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                        const rate = await getDocFirebase(getExchange(values.date));
                        if(rate && rate.sale) {
                            if(values.mount > 200) {
                                values.mount = (values.mount / rate.sale).toFixed(2);
                            }
                            await addPayment(student, values, rate.sale);
                            toast.done('Pago registrado.');
                            dispatch(closeModal());
                        } else {
                            toast.error('No hay tasa registrada para la fecha seleccionada.');
                        }
                    } catch(error) {
                        setErrors({payment: 'Problemas con el registro del pago.'});
                        toast.error('Problemas con el registro del pago.');
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    
                    <Form className='ui form'>
                        Si el monto es inferior a (200) se considera $, en caso contrario Bs 
                        y se hara la conversi&oacute;n a $ seg&uacute;n la tasa del d&iacute;a seleccionado.
                        <MyTextInput label='Pago' name='mount' type='number' min='1' step="0.01" placeholder='Cantidad...' required />
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

export default Payment;
