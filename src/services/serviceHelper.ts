export const httpSuccess = (status: number) => {
    return status >= 200 && status <= 226;
};

export const httpServerError = (status: number) => {
    return status >= 500 && status <= 511;
};

export const httpClientError = (status: number) => {
    return status >= 400 && status <= 451;
};
