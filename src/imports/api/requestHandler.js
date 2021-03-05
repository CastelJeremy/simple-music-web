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

async function ping() {
    try {
        const response = await request('albums', { method: 'GET' });

        return response.status === 401;
    } catch (err) {
        return false;
    }
}

export { request, ping };
