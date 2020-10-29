import {combineReducers} from 'redux';
import modalReducer from '../common/modals/modalReducer';
import asyncReducer from '../async/asyncReducer';
import authReducer from '../../features/auth/authReducer';
import profileReducer from '../../features/profiles/profileReducer';
import studentReducer from '../../features/students/studentReducer';
import exchangeReducer from '../../features/exchange/exchangeReducer';

const rootReducer = combineReducers({
    modals: modalReducer,
    student: studentReducer,
    exchange: exchangeReducer,
    auth: authReducer,
    async: asyncReducer,
    profile: profileReducer
});

export default rootReducer;
