
import firebase from '../config/firebase';

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
    return db.collection('students').orderBy('lastName'); //.where('classroom', '==', classroom)
};

export const listenToStudentFromFirestore = (eventId) => {
    return db.collection('students').doc(eventId);
};

export const addExchange = (exchange) => {
    return db.collection('exchange').add({
        ...exchange
        })
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