import React from "react";
import CountUp from 'react-countup';

import style from './Dial.css';

import pointer from './carbon-dial.svg';
import background from './carbon-dial__background.svg';

class Dial extends React.Component {

	createDangerousHTML = (e) => {
		return {
			__html : e
		}
	}

	prettifyBanding = (string) => {
		return string.replace(/ /g, '-');
	};

	getCarbonForecast = () => {
		let endpoint = `/api/`;

		// fetch(endpoint)
		// 	.then( (response) => {
  //               if (response.status >= 200 && response.status < 400) {
		// 			return response.json();
		// 		}
		// 		else {
		// 			throw new Error('Response not >= 200 and < 400');
		// 		}
		// 	})
		// 	.then( (response) => {
		//         this.setState({
		//         	carbon : response.data[0].intensity.average,
		//         	carbonIndex : this.prettifyBanding(response.data[0].intensity.index),
		//         	timeHumanReadable: `${response.data[0].fromHumanReadable} to ${response.data[0].toHumanReadable}`,
		//         	time: response.data[0].from
		//         });
		// 	})
		// 	.catch( (error) => {
		// 		console.warn(error)
		// 	})

		let request = new XMLHttpRequest();
            request.open('GET', endpoint, true);
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
                    	console.warn('XHR error');
                        // Error :(
                    }
                }
            });
			request.send();
	};

	onCounterComplete = () => {
		this.setState({counterStart : this.state.carbon})
	};

	tick = () => {
		console.log('tick tock', new Date())
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
	}

	counterClassName = () => {
		if (this.state.carbon === "?") {
			return `${style['counter']} ${style['counter--inactive']}`;
		}
		else {
			return style['counter'];
		}
	}


	constructor(props) {
		super(props);
		this.state = {
			carbon : "?",
			counterStart: 0,
			timeHumanReadable : "?"
		};
	};

	componentDidMount() {
		this.tick()
		this.interval = setInterval(() => {
			this.tick()
		},
		600000 // 10 * 60 * 1000 // ten minutes
		);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		let pointerClassName = `${style['dial__pointer']} ${style['dial__pointer--' + this.state.carbonIndex]}`;
		return (
			<figure className={style['dial']}>
				<div className={style['wrapper']}>
					<div
						className={style['dial__background']}
						dangerouslySetInnerHTML={this.createDangerousHTML(background)}
					/>
					<div
						className={pointerClassName}
						style={this.calculateRotation(this.state.carbon)}
						dangerouslySetInnerHTML={this.createDangerousHTML(pointer)}
					/>
					<figcaption className={this.counterClassName()}>
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
	}
}
export default Dial;
