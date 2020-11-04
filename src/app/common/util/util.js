import { toast } from 'react-toastify';

export const getKeyDate = (date) => {
    let key = date.getFullYear();
    key += ("0" + (date.getMonth() + 1)).slice(-2);
    key += ("0" + (date.getDate())).slice(-2);
    return key;
}

export const getDocFirebase = async (ref) => {
    return await ref.get().then((doc)=> {
        if (doc.exists) {
            return doc.data();
        } else {
            return;
        }
    }).catch((error)=> {
        toast.error(error.message);
    });
}
