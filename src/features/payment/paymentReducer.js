import { MAKE_PAYMENT, LISTEN_PAYMENTS, LISTEN_PAYMENTS_STUDENT } from './paymentConstants';

const initialState = {
    payment: null,
    payments: [],
    paymentsStudent: []
}

const paymentReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case MAKE_PAYMENT:
            return {
                ...state,
                payment: payload
            }
        case LISTEN_PAYMENTS:
            return {
                ...state,
                payments: payload
            }
        case LISTEN_PAYMENTS_STUDENT:
            return {
                ...state,
                paymentsStudent: payload
            }
        default: 
            return state;
    }
}

export default paymentReducer;