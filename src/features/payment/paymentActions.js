import {MAKE_PAYMENT, LISTEN_PAYMENTS, LISTEN_PAYMENTS_STUDENT} from './paymentConstants';

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

export const listenToPaymentsStudent = (payments) => {
    return {
        type: LISTEN_PAYMENTS_STUDENT,
        payload: payments
    }
}
