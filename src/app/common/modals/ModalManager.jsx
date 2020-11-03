import React from 'react';
import {useSelector} from 'react-redux';
import LoginForm from '../../../features/auth/LoginForm';
import RegisterExchange from '../../../features/exchange/RegisterExchange';
import Payment from '../../../features/payment/Payment';

const ModalManager = () => {
    const modalLookup = {
        RegisterExchange,
        LoginForm,
        Payment
    };
    const currentModal = useSelector(state => state.modals);
    let renderedModal;

    if(currentModal){
        const {modalType, modalProps} = currentModal;
        const Modalcomponent = modalLookup[modalType];
        renderedModal = <Modalcomponent  {...modalProps} />
    }
    return <span>{renderedModal}</span>
}

export default ModalManager;
