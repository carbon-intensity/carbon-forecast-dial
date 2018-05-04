exports.handler = (event, context, callback) => {
    let response = [];

    callback(null, {
        statusCode: 200,
        headers : {
            "Content-Type" : 'application/json; charset=utf-8',
            "X-Powered-By" : 'Electricity',
            "Access-Control-Allow-Methods": 'GET',
            "Access-Control-Allow-Origin" : '*'
        },
        body: JSON.stringify( 'response' )
    });
}
