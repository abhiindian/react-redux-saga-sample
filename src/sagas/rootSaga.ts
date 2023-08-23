import { all } from 'redux-saga/effects';
import * as blogSagas from './blogSaga';


export default function* rootSaga() {
    yield all([
        blogSagas.fetchPostsSaga(),
        blogSagas.addPostSaga(),
        blogSagas.editPostSaga(),
        blogSagas.removePostSaga()
    ]);
}