import React from "react";
import ReactDOM from "react-dom";

import dayjs from 'dayjs';

import Dial from './components/Dial/index.jsx';
import GenMixDial from './components/GenMixDial/index.jsx';

import getGenMix from './utilities/getGenMix/index.js';


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            from: "",
            to: "",
            generation: 0,
            generationTypes: [
                {
                    "name": "gas",
                    "MW": 0,
                    "perc": 0
                },
                {
                    "name": "coal",
                    "MW": 0,
                    "perc": 0
                },
                {
                    "name": "biomass",
                    "MW": 0,
                    "perc": 0
                },
                {
                    "name": "nuclear",
                    "MW": 0,
                    "perc": 0
                },
                {
                    "name": "hydro",
                    "MW": 0,
                    "perc": 0
                },
                {
                    "name": "storage",
                    "MW": 0,
                    "perc": 0
                },
                {
                    "name": "imports",
                    "MW": 0,
                    "perc": 0
                },
                {
                    "name": "other",
                    "MW": 0,
                    "perc": 0
                },
                {
                    "name": "wind",
                    "MW": 0,
                    "perc": 0
                },
                {
                    "name": "solar",
                    "MW": 0,
                    "perc": 0
                }]
        }
    }

    componentDidMount() {
        getGenMix(this);
    }

    render() {

        let genMixDials = this.state.generationTypes.map( (x, y) => {
            if (x.name !== 'other') {
                return <GenMixDial key={y} percent={x.perc} megawatts={x.MW} name={x.name} />;
            }
        });

        return(
            <React.Fragment>
                <Dial />
                <div style={{ width: '50vw', height: '100vh', display: 'flex', alignContent: 'center', flexWrap : 'wrap', paddingTop: '3vh' }}>
                    {genMixDials}
                </div>
            </React.Fragment>
        );
    }
}

let app =  document.getElementById("app");

app.style.display = "flex";
app.style.alignContent = "center";

app ? ReactDOM.render(<App />, app) : false;
