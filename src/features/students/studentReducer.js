import { FETCH_STUDENTS, GET_STUDENT } from './studentConstants';

const initialState = {
    students: [],
    student: null
}

const studentReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case FETCH_STUDENTS:
            return {
                ...state,
                students: payload
            }
        case GET_STUDENT:
            return {
                ...state,
                student: payload
            }
        default: 
            return state;
    }
}

export default studentReducer;
