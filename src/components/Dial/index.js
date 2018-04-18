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

	band = (string) => {
		switch(string) {
			case 'very high':
				return 'very-high';
				break;
			case 'high':
				return 'high';
				break;
			case 'moderate':
				return 'moderate';
				break;
			case 'low':
				return 'low';
				break;
			case 'very low':
				return 'very-low';
				break;
			default:
				return false;
			}
	};

	getCarbonForecast = () => {
		let endpoint = `https://carbon-dial.netlify.com/api/`;

		let request = new XMLHttpRequest();
            request.open('GET', endpoint, true);
            request.onreadystatechange = (ev) => {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 400) {
                        let response = JSON.parse(request.responseText);
                        this.setState({
                        	carbon : response.data[0].intensity.forecast,
                        	carbonIndex : this.band(response.data[0].intensity.index)
                        })
                    }
                    else {
                    	console.warn('XHR error');
                        // Error :(
                    }
                }
            };
			request.send();
	};

	onCounterComplete = () => {
		this.setState({counterStart : this.state.carbon})
	};

	tick = () => {
		this.getCarbonForecast();
	}


	constructor(props) {
		super(props);
		this.state = {
			carbon : 0,
			counterStart: 0
		};
		this.getCarbonForecast();

		// setTimeout( () => {
		// 	this.setState({carbon: 250})
		// }, 5000)
		// setTimeout( () => {
		// 	this.setState({carbon: 50})
		// }, 7500)
	};

	componentDidMount() {
		this.interval = setInterval(() => {
			this.tick(),
			60 * 1000
		});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		let pointerClassName = () => {
			return `${style['dial__pointer']} ${style['dial__pointer--' + this.state.carbonIndex]}`;
		}

		let calculateRotation = (integer) => {

			let rotation = {
				max : 285
			};

			let carbon = {
				max : 380
			}

			if (integer >= carbon.max) {
				return { transform: 'rotate(' + rotation.max + 'deg)'};
			}
			else {
				return { transform: 'rotate(' + (integer / rotation.max) * integer + 'deg)' };
			}

		}

		return (
			<figure className={style['dial']}>
				<div className={style['wrapper']}>
					<div
						className={style['dial__background']}
						dangerouslySetInnerHTML={this.createDangerousHTML(background)}
					/>
					<div
						className={pointerClassName()}
						style={calculateRotation(this.state.carbon)}
						dangerouslySetInnerHTML={this.createDangerousHTML(pointer)}
					/>
					<figcaption className={style['counter']}>
						<CountUp
							start={this.state.counterStart}
							end={this.state.carbon}
							duration={1.5}
							useEasing={true}
							separator=","
							className={style['counter__number']}
							onComplete={this.onCounterComplete}
						/>
						g CO₂ per kWh
					</figcaption>
				</div>
			</figure>
		);
	}
}
export default Dial;
