import firebase from '../config/firebase';

export const signInWithEmail = (creds) => {
    return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
}

export const signOutFirebase = () => {
    return firebase.auth().signOut();
}

