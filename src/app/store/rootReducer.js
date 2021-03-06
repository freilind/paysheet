import {combineReducers} from 'redux';
import modalReducer from '../common/modals/modalReducer';
import asyncReducer from '../async/asyncReducer';
import authReducer from '../../features/auth/authReducer';
import profileReducer from '../../features/profiles/profileReducer';
import studentReducer from '../../features/students/studentReducer';
import exchangeReducer from '../../features/exchange/exchangeReducer';
import paymentReducer from '../../features/payment/paymentReducer';
import {connectRouter} from 'connected-react-router';

const rootReducer= (history) => combineReducers({
    router: connectRouter(history),
    modals: modalReducer,
    student: studentReducer,
    exchange: exchangeReducer,
    auth: authReducer,
    async: asyncReducer,
    profile: profileReducer,
    payment: paymentReducer
});

export default rootReducer;
