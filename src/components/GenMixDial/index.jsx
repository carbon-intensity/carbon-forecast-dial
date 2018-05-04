import React from "react";
import report from '../../utilities/report';
import createDangerousHTML from '../../utilities/createDangerousHTML';
import style from './GenMixDial.css';


class GenMixDial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            percent : this.props.percent,
            megawatts : this.props.megawatts
        };
    };

    render() {
        return <p>{this.state.name} {this.state.percent}% {this.state.megawatts}</p>
    }
}

export default GenMixDial;