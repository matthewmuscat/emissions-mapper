import request from 'superagent';

export default (
    url,
    method,
    body = {},
) => new Promise((resolve, reject) => {
    if (url && method) {
        switch (method.toLowerCase()) {
        case 'get': {
            return request.get(url)
                .set('content-type', '*')
                .then(res => resolve(res))
                .catch((err) => {
                    reject(new Error('CustomApi GET | error found: ', err));
                });
        }

        case 'delete': {
            return request.delete(url)
                .then(res => resolve(res))
                .catch((err) => {
                    reject(new Error('CustomApi DELETE | error found: ', err));
                });
        }

        case 'post': {
            return request.post(url)
                .send(body)
                .then(res => resolve(res))
                .catch((err) => {
                    reject(new Error('CustomApi POST | error found: ', err));
                });
        }

        case 'put': {
            return request.put(url)
                .send(body)
                .then(res => resolve(res))
                .catch((err) => {
                    reject(new Error('CustomApi PUT | error found: ', err));
                });
        }

        default:
            return reject(new Error('no url or method specified'));
        }
    }
    return reject(new Error('no url or method specified'));
});
