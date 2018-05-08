const https = require('https');
const dayjs = require('dayjs');

const getGenMix = (start, end) => {
    return new Promise( (resolve, reject) => {
        const from = dayjs().toISOString();
        const to = dayjs().add(15, 'minutes').toISOString();
        const endpoint = `https://k1nehbcl85.execute-api.eu-west-2.amazonaws.com/v4/generation/${from}/${to}`
        console.log(endpoint);
        https
            .get(endpoint, (response) => {
                if ( response.statusCode >= 200 && response.statusCode < 400) {
                    response.on('data', (data) => {
                        resolve( JSON.parse(data) );
                    });
                }
                else {
                    reject(response);
                }
            })
            .on('error', (error) => {
                reject(error);
            })
            .end();
    })
};

exports.handler = (event, context, callback) => {

    getGenMix()
        .then( (response) => {
            callback(null, {
                statusCode: 200,
                headers : {
                    "Content-Type" : 'application/json; charset=utf-8',
                    "X-Powered-By" : 'Electricity',
                    "Access-Control-Allow-Methods": 'GET'
                },
                body: JSON.stringify(response)
            });
        })
        .catch( error => {
            console.warn(error)
        })
}
