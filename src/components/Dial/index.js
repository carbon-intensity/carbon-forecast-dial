import React from "react";
import style from './Dial.css';
import pointer from './carbon-dial.svg';
import background from './carbon-dial__background.svg';

class Dial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			carbon : 0
		};
		this.getCarbonForecast();
	};

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

	getCarbonForecast = (duration) => {
		let endpoint = `https://api.carbonintensity.org.uk/intensity`;

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
	createBackground = () => {
		return {
			__html : background
		}
	}
	createPointer = () => {
		return {
			__html : pointer
		}
	}

	// min : rotate(0)
	// max : rotate(285deg)

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
				console.log((integer / rotation.max) * integer)
				return { transform: 'rotate(' + (integer / rotation.max) * integer + 'deg)' };
			}

		}

		return (
			<figure className={style['dial']}>
				<div className={style['wrapper']}>
					<div className={style['dial__background']} dangerouslySetInnerHTML={this.createBackground()} />
					<div className={pointerClassName()} style={calculateRotation(this.state.carbon)} dangerouslySetInnerHTML={this.createPointer()} />
				</div>
			</figure>
		);
	}
}
export default Dial;
