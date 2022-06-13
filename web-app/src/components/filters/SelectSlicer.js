import React from 'react';
import PropTypes from 'prop-types';
import { default as ReactSelect } from 'react-select';


class SelectSlicer extends React.Component {

	constructor(props) {
		super(props);
		this.state = { multiValue: [] };
	}

	static propTypes = {
		checkBoxes: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired,
		readOnly: PropTypes.bool
	};

	handleMultiChange = (option) => {
		const newCheckBoxes = [...this.props.checkBoxes];
		//get values array
		const seletedRecords = option.map(x => x.value);
		//const filteredObjects = newCheckBoxes.filter(x => seletedRecords.includes(x.value));
		newCheckBoxes.forEach(x => {
			if(seletedRecords.includes(x.value)){
				x.isChecked = true;
			}else{
				x.isChecked = false;
			}
		});
		this.props.onChange(this.props.id, newCheckBoxes);
	}

	render() {
		const {
			checkBoxes = [],
			readOnly = false
		} = this.props;

		const checkBoxItems = [];
		for (let i = 0; i < checkBoxes.length; i++) {
			const {
				value,
				isChecked
			} = checkBoxes[i];
			checkBoxItems.push({ value: value, label: value });
		}
		//this.handleMultiChange = this.handleMultiChange.bind(this);

		return (
			<div>
				<div className="slicer-body">
					<ReactSelect
						placeholder={'Select ...'}
						options={checkBoxItems}
						onChange={this.handleMultiChange}
						isMulti
					/>
				</div>
			</div>
		);
	}
}

export default SelectSlicer;