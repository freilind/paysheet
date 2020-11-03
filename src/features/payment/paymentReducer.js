import { MAKE_PAYMENT } from './paymentConstants';

const initialState = {
    payment: null
}

const paymentReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case MAKE_PAYMENT:
            return {
                ...state,
                payment: payload
            }
        default: 
            return state;
    }
}

export default paymentReducer;