import { MAKE_PAYMENT, LISTEN_PAYMENTS } from './paymentConstants';

const initialState = {
    payment: null,
    payments: []
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
        default: 
            return state;
    }
}

export default paymentReducer;