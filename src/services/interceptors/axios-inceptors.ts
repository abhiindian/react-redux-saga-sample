import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { showSnackbarMessage } from "../../state/snackbarSlice";
import { httpSuccess } from '../serviceHelper';
import { store } from '../../app/store';
// import { appInsights } from '../../app-insights/ApplicationInsightsService';


const apiConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accepct: 'Application/json',
        'Content-Type': 'Application/json',
    },
};

export const baseAxiosInstance: AxiosInstance = axios.create(apiConfig);

const handleGlobalError = (status: number) => {
    const { dispatch } = store;
    switch (status) {
        case 401:
            dispatch(
                showSnackbarMessage({
                    message: 'Missing or invalid authentication token. Please refresh your page to continue',
                    severity: 'error',
                }),
            );
            break;
        default:
            break;
    }
};

export const useAxiosLoader = () => {
    const [counter, setCounter] = React.useState(0);

    const interceptors = React.useMemo(() => {
        const inc = () => setCounter(c => c + 1);
        const dec = () => setCounter(c => c - 1);

        return {
            request: (config: AxiosRequestConfig) => {
                inc();
                let accessToken = sessionStorage.getItem('accessToken');
                config.headers = { 'Authorization': `Bearer ${accessToken}` };
                return config;
            },
            requestError: (error: any) => {
                dec();
                // appInsights.trackEvent({ name: 'API Request Error', properties: { error: error } });
                // appInsights.trackException({ exception: error, properties: { name: 'API Request Error' } });
                return Promise.reject(error);
            },
            response: (response: AxiosResponse) => {
                dec();
                if (!httpSuccess(response?.status)) {
                    // appInsights.trackEvent({ name: 'Network Error', properties: { response: response } });
                    // appInsights.trackException({ exception: new Error('Network Error'), properties: { response: response } });
                    throw new Error(response.statusText);
                }
                if (response.status === 401) {
                    handleGlobalError(response.status);
                    throw new Error(response.statusText);
                }
                return response;
            },
            responseError: (error: any) => {
                dec();
                // appInsights.trackEvent({ name: 'API Response Error', properties: { error: error } });
                // appInsights.trackException({ exception: error, properties: { name: 'API Response Error' } });
                handleGlobalError(error?.response?.status);
                // Rejects the promise so the caller can choose to handle the exception however needed
                return Promise.reject({ ...error, response: error.response ?? { status: 500, data: null } });
            },
        };
    }, []); // create the interceptors

    React.useEffect(() => {
        // add request interceptors
        const reqInterceptor = baseAxiosInstance.interceptors.request.use(
            interceptors.request,
            interceptors.requestError
        );
        // add response interceptors
        const resInterceptor = baseAxiosInstance.interceptors.response.use(
            interceptors.response,
            interceptors.responseError,
        );
        return () => {
            // remove all intercepts when done
            baseAxiosInstance.interceptors.request.eject(reqInterceptor);
            baseAxiosInstance.interceptors.response.eject(resInterceptor);
        };
    }, [interceptors]);

    return [counter > 0];
};