import firebase from '../config/firebase';
import {getKeyDate} from '../common/util/util';
import { monthNames } from '../common/constants';

const db = firebase.firestore();

export const dataFromSnapshot = (snapshot) => {
    if (!snapshot.exists) return undefined;
    const data = snapshot.data();

    for (const prop in data) {
        if (data.hasOwnProperty(prop) && data[prop] instanceof firebase.firestore.Timestamp) {
            data[prop] = data[prop].toDate();
        }
    }

    return {
        ...data,
        id: snapshot.id
    }
};

export const listenToStudentsFromFirestore = (classroom) => {
    return db.collection('students').where('classroom', '==', classroom);
};

export const listenToStudentFromFirestore = (eventId) => {
    return db.collection('students').doc(eventId);
};

export const addExchange = (exchange) => {
    const keyDate = getKeyDate(exchange.date);
    return db.collection('exchange').doc(keyDate).set({
        ...exchange
    })
};

export const updateExchange =  async (id, exchange) => {
    return await db.collection('exchange').doc(id).update(exchange);
};

export const setUserProfile = (user) => {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null, 
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export const getUserProfile = (userId) => {
    return db.collection('users').doc(userId);
}

export const updateUserProfile = async (profile) => {
    const user = firebase.auth().currentUser;
    try {
        if(user.displayName !== profile.displayName) {
            await user.updateProfile({
                displayName: profile.displayName
            })
        }
        return await db.collection('users').doc(user.uid).update(profile);
    } catch(error) {
        throw error;
    }
}


export const getStudent = (studentId) => {
    return db.collection('students').doc(studentId);
}

export const addPayment = async (studentId, payment) => {
    const objUpdate = {};
    console.log(payment);
    const keyDate = getKeyDate(payment.date);
    const exc = db.collection('exchange').doc(keyDate);
    let data1;
    exc.onSnapshot(snapshot=> {
        data1 = snapshot.data();
        console.log(data1);
    });
    objUpdate = {
        rate: data1.sale,
        date: payment.date,
        mount: payment.mount
    }

    const month = monthNames[payment.date.getMonth()];
    const ref = db.collection('students').doc(studentId);
    let data;
    ref.onSnapshot(snapshot=> {
        data = snapshot.data();
        const m =data.payments.filter(m => m.month === month);
        m[0].transactions.push(objUpdate);
    });

    /*return db.collection('students').doc(studentId).set({
        ...data
    })*/
};