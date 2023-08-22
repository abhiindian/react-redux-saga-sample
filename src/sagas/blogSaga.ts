import { call, put, takeLatest } from "redux-saga/effects";
import { callFailure, fetchPosts, setPosts } from "../state/blogSlice";
import { BlogPost } from "../types/BlogTypes";
import { getBlogPosts } from "../services/blogpost-service";
import { store } from "../app/store";
import { showSnackbarMessage } from "../state/snackbarSlice";

export function* fetchPostsSaga() {
    yield takeLatest(fetchPosts.type, handlefetchPosts);
}

export function* updateSaga() {
    yield takeLatest(fetchPosts.type, handlefetchPosts);
}

function* handlefetchPosts() {
    try {
        const response: Array<BlogPost> = yield call(getBlogPosts);
        // appInsights.trackTrace({ message: "Handle get asset by type saga", severityLevel: SeverityLevel.Information }, { page: "assets", function: "handleGetAssetsByType", payload: action.payload });
        yield put(setPosts(response));
    } catch (err: any) {
        handleError(err, `Error fetching asset masters`, (errorMessage: string) => {
            const { dispatch } = store;
            dispatch(callFailure());
            // appInsights.trackException({ exception: err, properties: { name: "Handle get asset master saga error", function: "handleGetAssetMasters" } });
        });

    }
}


function handleError(err: any, alternateErrorMessage: string, fnCall?: any) {
    const { dispatch } = store;
    if (window.navigator.onLine && err) {
        let error: string[] = err?.response?.data?.messages;
        let errorMessage = error?.length > 0 ? error.join() : alternateErrorMessage;
        if (fnCall) {
            fnCall(errorMessage);
        }
        dispatch(showSnackbarMessage({ message: errorMessage, severity: "error" }));
    } else {
        dispatch(showSnackbarMessage({ message: "Network Error", severity: "error" }));
    }
}