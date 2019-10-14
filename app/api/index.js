import {
	API_KEY,
    API_URL
} from '../config';

export const login = data => {
    return fetch(
            API_URL + 'login', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            })
        .then(response => response.json());
};

export const mymoves = (token) => {
    return fetch(
            API_URL + 'get_move_records', {
                method: 'GET',
                headers: getHeaders(token)
            })
        .then(response => response.json());
};

export const movedetails = (token, id) => {
    return fetch(
            API_URL + 'get_move_details/'+id, {
                method: 'GET',
                headers: getHeaders(token)
            })
        .then(response => response.json());
};

export const mymails = (token, id) => {
    return fetch(
        API_URL + 'get_messages'+'?random_number='+ new Date().getTime(), {
        method: 'GET',
        headers: getHeaders(token)
    })  
    .then(response => response.json());
};

export const staffs = (token) => {
    return fetch(
        API_URL + 'get_staffs', {
        method: 'GET',
        headers: getHeaders(token)
    })  
    .then(response => response.json());
};

export const compose = (token, data) => {
    return fetch(
        API_URL + 'compose_message', {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(data)
    })  
    .then(response => response.json());
};

getHeaders = (token) => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Api-Key': API_KEY,
        'Authorization': 'Token token='+token,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
    };
}