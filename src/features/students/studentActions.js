import { FETCH_STUDENTS } from './studentConstants';

export const listenToStudents = (students) => {
    return {
        type: FETCH_STUDENTS,
        payload: students
    }
}

