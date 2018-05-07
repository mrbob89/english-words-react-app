import ajax from './lib';

export default {
    get: (url, options) =>
        ajax({
            url,
            method: 'GET',
            ...options
        }),

    post: (url, body, options) =>
        ajax({
            url,
            method: 'POST',
            body: JSON.stringify(body),
            ...options
        }),

    put: (url, body, options) =>
        ajax({
            url,
            method: 'PUT',
            body: JSON.stringify(body),
            ...options
        }),

    delete: (url, options) =>
        ajax({
            url,
            method: 'DELETE',
            ...options
        })
};
