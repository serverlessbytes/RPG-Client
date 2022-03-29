import AuthStorage from '../AuthStorage';
import { API } from '../../config/api/api.config';
import axios from 'axios'


export const BaseURL = API.endpoint + '/';


// const axios = require('axios').default;

const defaultHeaders = {
    isAuth: true,
    AdditionalParams: {},
    isJsonRequest: true
};

export const ApiGet = (type) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BaseURL}${type}`, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiGetNoAuth = (type) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BaseURL}${type}`, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPost = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${BaseURL}${type}`, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPostNoAuth = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${BaseURL}${type}`, userData, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('message') && error.response.data.message) {
                    reject(error.response.data.message);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPatch = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${BaseURL}${type}`, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiDelete = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${BaseURL}${type}`, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPut = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.put(`${BaseURL}${type}`, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}



export const getHttpOptions = (options = defaultHeaders) => {
    let headers = {
        Authorization: "",
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': null,
        'Access-Control-Allow-credentials': true,   
    };
    // "Origin, X-Requested-With, Content-Type, Accept"

    if (options.hasOwnProperty('isAuth') && options.isAuth) {
        headers['Authorization'] = AuthStorage.getToken() ?? "";
    }

    if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
        headers['Content-Type'] = 'application/json';
    }

    if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
        headers = { ...headers, ...options.AdditionalParams };
    }

    return { headers }
}