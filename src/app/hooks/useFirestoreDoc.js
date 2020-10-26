import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncReducer";
import { dataFromSnapshot } from "../services/firestoreService";

const useFirestoreDoc = ({query, data, dependency, shouldExecute = true}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!shouldExecute) return;
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                if(!snapshot.exists) {
                    dispatch(asyncActionError({
                        code: 'not-found',
                        message:'Could not found document'
                    }));
                    return;
                }
                data(dataFromSnapshot(snapshot));
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

export default useFirestoreDoc;
