import React from "react";
import ReactDOM from "react-dom";
import Dial from './components/Dial';

class App extends React.Component {
    render() {
        return <Dial />
    }
}

const app = document.getElementById("app");

app ? ReactDOM.render(<App />, app) : false;