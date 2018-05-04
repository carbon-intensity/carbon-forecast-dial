import React from "react";
import ReactDOM from "react-dom";

import Dial from './components/Dial/index.jsx';
import GenMixDial from './components/GenMixDial/index.jsx';

import getGenMix from './utilities/getGenMix/index.js';


class App extends React.Component {

    render() {
    getGenMix();
        return(
            <React.Fragment>
                <Dial />
                <GenMixDial percent="100" megawatts="2" name="Solar" />
            </React.Fragment>
        );
    }
}


app ? ReactDOM.render(<App />, document.getElementById("app")) : false;