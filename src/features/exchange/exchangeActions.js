import { FETCH_EXCHANGE_DAY } from './exchangeConstants';

export const exchangeDay = (exchange) => {
    return {
        type: FETCH_EXCHANGE_DAY,
        payload: exchange
    }
}
