async function request(uri, options) {
    const { method, token, data } = options;

    return fetch('http://api.jeremycastel.net:10000/' + uri, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(data),
    });
}

export { request };
