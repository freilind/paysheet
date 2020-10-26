import {SIGN_IN_USER, SIGN_OUT_USER} from './authConstants';
import firebase from '../../app/config/firebase';
import { APP_LOADED } from '../../app/async/asyncReducer';
import { dataFromSnapshot, getUserProfile } from '../../app/services/firestoreService';
import { listenToCurrentUserProfile } from '../profiles/profileActions';

export const signInUser = (user) => {
    return {
        type: SIGN_IN_USER,
        payload: user
    }
}

export const verifyAuth = () => {
    return (dispatch) => {
        return firebase.auth().onAuthStateChanged(user => {
            if(user) {
                dispatch(signInUser(user));
                const profileRef = getUserProfile(user.uid);
                profileRef.onSnapshot(sanpshot =>{
                    dispatch(listenToCurrentUserProfile(dataFromSnapshot(sanpshot)));
                    dispatch({type: APP_LOADED});
                })
            } else {
                dispatch(signOutUser());
                dispatch({type: APP_LOADED});
            }
        })
    }
}

export const signOutUser = () => {
    return {
        type: SIGN_OUT_USER
    }
}
