async function request(uri, options) {
    const { method, token, data } = options;

    return fetch('host' + uri, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? 'Bearer ' + token : null,
        },
        body: JSON.stringify(data),
    });
}

export { request };
