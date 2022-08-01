import React from 'react';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import './GaugeColorPicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

class GaugeColorPicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			parts: []
		};
		const { value } = this.props;
		if (value.length > 0) {
			let baseValue = 0;
			let actualValue = 0;
			value.map((part, index) => {
				actualValue = part[0] * 100;
				if (index > 0) {
					if (index === (value.length - 1)) {
						actualValue = 1;
					} else {
						actualValue = actualValue - baseValue;
						baseValue = baseValue + actualValue;
					}
				}else{
					baseValue = actualValue;	
				}
				this.state.parts.push({
					key: index,
					percentage: actualValue,
					color: part[1]
				});
			});

		} else {
			this.state.parts.push({
				key: Date.now(),
				percentage: '100',
				color: '#438f35',
			});
		}
	}

	handleChange = (name, value, key) => {
		if ("percentage" === name) {
			//if (value < 1 || value > 100) {
			//	toast.error('Invalid value');
			//	return;
			//}
		}


		this.setState((prevState) => {
			const newParts = prevState.parts.map((element) => {
				if (element.key === key) {
					element[name] = value;
				};
				return element;
			});
			return { parts: newParts };
		});
	};

	calculatePercentage = () => {
		const { parts } = this.state;
		let totalPercentageValue = 0;
		const color = [];
		parts.map((part, index) => {
			let partPercentage = parseInt(part.percentage);
			if (partPercentage === 10) {
				partPercentage = partPercentage / 1000;
			} else {
				partPercentage = partPercentage / 100;
			}

			totalPercentageValue = totalPercentageValue + partPercentage;
			const partColor = part.color === '' ? 'part.color' : part.color;
			if (index === (parts.length - 1)) {
				color.push([1, partColor]);
			} else {
				if (totalPercentageValue <= 1) {
					color.push([totalPercentageValue.toPrecision(2), partColor]);
				}
			}

		});
		if (totalPercentageValue > 1) {
			toast.error('Please fix parcentage');
			return;
		}
		return color;
	}

	saveData = () => {
		this.props.onChange(this.props.name, this.calculatePercentage());
		toast.info("Gauge percentage saved...");
	}

	addElement = () => {
		const { percentage, color } = this.state;
		this.setState((prevState) => ({
			parts: prevState.parts.concat({
				key: Date.now(),
				percentage: '',
				color: ''
			})
		}));
	};

	removeElement = (id) => {
		this.setState((prevState) => ({
			parts: prevState.parts.filter((part) => part.key !== id)
		}));
	};

	render() {
		const { parts } = this.state;

		return (
			<div>
				<button type="button" onClick={this.addElement} disabled={parts.length === 10}>
					<FontAwesomeIcon icon="plus" />
				</button>
				<button type="button" style={{ marginLeft: "10px" }}>
					<FontAwesomeIcon icon="save" onClick={this.saveData} />
				</button>
				{parts.map((part, index) => (
					<div className="gclrPlt" key={part.key}>
						<input
							className="form-input"
							style={{ width: "100px" }}
							name={"percentage"}
							maxLength={2}
							value={part.percentage}
							onChange={(event) => this.handleChange('percentage', event.target.value, part.key)}
							placeholder="Percentage"
							type="text"
						/>
						<ColorPicker name={"color"} value={part.color} onChange={this.handleChange} type="hex" multiple={part.key} />
						<button
							type="button"
							onClick={() => this.removeElement(part.key)}
							disabled={parts.length <= 1}
						>
							<FontAwesomeIcon icon="trash-alt" />
						</button>
					</div>
				))}
			</div>
		);
	}
} export default GaugeColorPicker;