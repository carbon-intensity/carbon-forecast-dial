import report from '../report/index.js';

const getGenMix = () => {
    let endpoint = `https://k1nehbcl85.execute-api.eu-west-2.amazonaws.com/v4/generation/2018-04-20T10:30Z/2018-04-20T11:00Z`;

    let request = new XMLHttpRequest();
    request.addEventListener('load', (ev) => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 400) {
                let response = JSON.parse(request.responseText);
                this.setState({
                    carbon : response.data[0].intensity.average,
                    carbonIndex : prettifyBanding(response.data[0].intensity.index),
                    timeHumanReadable: `${response.data[0].fromHumanReadable} to ${response.data[0].toHumanReadable}`,
                    time: response.data[0].from
                });
            } else {
                report('Error reaching Carbon Intensity API', request, 'critical');
                // Error :(
            }
        }
    });
    request.addEventListener('error', (ev) => {
        report('An error occured while receiving the data from the API.', ev, 'error');
    });
    request.addEventListener('abort', (ev) => {
        report('The connection to the API was aborted', ev, 'warning');
    });

    request.open('GET', endpoint, true);
    request.send();
}

export default getGenMix;
