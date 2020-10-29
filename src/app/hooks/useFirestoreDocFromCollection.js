import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { exchangeDay } from "../../features/exchange/exchangeActions";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncReducer";
import { dataFromSnapshot } from "../services/firestoreService";

const useFirestoreDocFromCollection = ({query, data, dependency}) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                if(snapshot.docs.length > 0) {
                    data(dataFromSnapshot(snapshot.docs[0]));
                } else {
                    dispatch(exchangeDay(null))
                }
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError(error))
        );
        return () => {
            unsubscribe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependency);
};

export default useFirestoreDocFromCollection;
