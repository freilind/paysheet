import {MAKE_PAYMENT, LISTEN_PAYMENTS} from './paymentConstants';

export const makePayment = (payment) => {
    return {
        type: MAKE_PAYMENT,
        payload: payment
    }
}

export const listenToPayments = (payments) => {
    return {
        type: LISTEN_PAYMENTS,
        payload: payments
    }
}
