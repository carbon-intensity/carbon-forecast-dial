import report from '../report/index.js';
import https from 'https';

const getGenMix = (t) => {
    let endpoint = `/mix`;

    let request = new XMLHttpRequest();
    request.addEventListener('load', (ev) => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 400) {
                let response = JSON.parse(request.responseText);
                t.setState({
                    from: response.data[0].from,
                    to: response.data[0].to,
                    generation: response.data[0].generation.MW,
                    generationTypes: response.data[0].generationTypes
                })
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
