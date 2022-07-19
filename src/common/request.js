import { BASE_URL } from '../shared/baseurl';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
});

const sendrequest = (config) => {
    return axiosInstance.request(config);
}

export const getrequest = (path) => {
    return sendrequest({
        url: path,
        method: 'GET'
    })
}

export const postrequest = (path, data) => {
    return sendrequest({
        url: path,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const deleterequest = (path, id) => {
    return sendrequest ({
        url: path + id,
        method: 'DELETE',
    })
}

export const putrequest = (path, data) => {
    return sendrequest ({
        url: path + data.id,
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}