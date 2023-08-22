import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import blogReducer from '../state/blogSlice';
import snackbarReducer from '../state/snackbarSlice';


const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    blog: blogReducer,
    snackbar: snackbarReducer
});

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
