import {MAKE_PAYMENT} from './paymentConstants';

export const makePayment = (payment) => {
    return {
        type: MAKE_PAYMENT,
        payload: payment
    }
}