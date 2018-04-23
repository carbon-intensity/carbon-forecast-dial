import React from "react";
import CountUp from 'react-countup';

import style from './Dial.css';

import pointer from 'svg-inline-loader!./carbon-dial.svg';
import background from 'svg-url-loader?iesafe!./carbon-dial__background.svg';

const report = (message, additionalInfo, level = 'warning') => {
	try {
		Rollbar[level](message, { moreInfo: JSON.stringify(additionalInfo) });
	}
	catch (error) {
		console.warn(level, message)
		console.dir(additionalInfo)
	}
}

class Dial extends React.Component {
	createDangerousHTML = (theHTML) => {
		return {
			__html : theHTML
		}
	};

	prettifyBanding = (string) => {
		return string.replace(/ /g, '-');
	};

	getCarbonForecast = () => {
		let endpoint = `/api/`;

		let request = new XMLHttpRequest();

        request.addEventListener('load', (ev) => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 400) {
                    let response = JSON.parse(request.responseText);
			        this.setState({
			        	carbon : response.data[0].intensity.average,
			        	carbonIndex : this.prettifyBanding(response.data[0].intensity.index),
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
	};

	onCounterComplete = () => {
		this.setState( {
			counterStart : this.state.carbon
		} )
	};

	tick = () => {
		// console.log('tick tock', new Date())
		this.getCarbonForecast();
	};

	calculateRotation = (currentCarbon) => {
		let rotation = {
			max : 285
		};
		let carbon = {
			max : 380
		};
		if (currentCarbon >= carbon.max) {
			return { transform: 'rotate(' + rotation.max + 'deg)'};
		}
		else {
			return { transform: 'rotate(' + ((rotation.max / carbon.max) * currentCarbon) + 'deg)' };
		}
	};

	counterClassName = () => {
		if (this.state.carbon === "?") {
			return `${style['counter']} ${style['counter--inactive']}`;
		}
		else {
			return style['counter'];
		}
	};


	constructor(props) {
		super(props);
		this.state = {
			carbon : "?",
			counterStart: 0,
			timeHumanReadable : "?"
		};
	};

	componentDidMount() {
		this.tick();
		this.interval = setInterval(() => {
			this.tick();
		},
		600000 // 10 * 60 * 1000 // ten minutes
		);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	};

	render() {
		let pointerClassName = `${style['dial__pointer']} ${style['dial__pointer--' + this.state.carbonIndex]}`;
		return (
			<figure className={style['dial']}>
				<div className={style['wrapper']}>
					<img className={style['dial__background']} src={background} alt="" aria-hidden="true" role="presentation" />
					<div
						className={pointerClassName}
						style={this.calculateRotation(this.state.carbon)}
						dangerouslySetInnerHTML={this.createDangerousHTML(pointer)}
					/>
					<figcaption className={this.counterClassName()} aria-live="polite">
						<p><CountUp
							start={this.state.counterStart}
							end={this.state.carbon}
							duration={1.5}
							useEasing={true}
							separator=","
							className={style['counter__number']}
							onComplete={this.onCounterComplete}
						/>
						g CO<sub>2</sub> per kWh</p>
						<p><time className={style.counter__time} dateTime={this.state.time}>{this.state.timeHumanReadable} today</time></p>
					</figcaption>
				</div>
			</figure>
		);
	};
}
export default Dial;
