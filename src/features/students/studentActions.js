import { FETCH_STUDENTS, GET_STUDENT } from './studentConstants';

export const listenToStudents = (students) => {
    return {
        type: FETCH_STUDENTS,
        payload: students
    }
}

export const listenStudent = (student) => {
    return {
        type: GET_STUDENT,
        payload: student
    }
}

