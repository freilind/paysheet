import { FETCH_EXCHANGE_DAY } from './exchangeConstants';

const initialState = {
    exchange: null
}

const exchangeReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case FETCH_EXCHANGE_DAY:
            return {
                ...state,
                exchange: payload
            }
        default: 
            return state;
    }
}

export default exchangeReducer;
