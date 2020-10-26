import { FETCH_STUDENTS } from './studentConstants';

const initialState = {
    students: []
}

const studentReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case FETCH_STUDENTS:
            return {
                ...state,
                students: payload
            }
        default: 
            return state;
    }
}

export default studentReducer;
