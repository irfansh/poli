import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RatingTable.css';

class RatingTable extends React.Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired,
		ratingColumn: PropTypes.string,
		defaultRatingStep: PropTypes.string,
		starColor: PropTypes.string,
		errorMsg: PropTypes.string
	};

	handleTdClick = (reportId, columnName, columnValue) => {
		this.props.onTableTdClick(reportId, columnName, columnValue);
	}

	calculateRating = (obj, ratingColumn, ratingScale, starColor) => {
		const cells = [];
		let ratingTD;
		let itemObj = obj.item;
		for (let key in itemObj) {
			if (key === ratingColumn) {
				let ratingIntValue = (parseInt(itemObj[key]) / ratingScale) * 100;
				console.log(starColor);
				let ratingValue = { "width": ratingIntValue + "%", "color": starColor};
				ratingTD = (
					<td>
						<div className="stars-outer">
							<FontAwesomeIcon icon={["far", "star"]} />
							<FontAwesomeIcon icon={["far", "star"]} />
							<FontAwesomeIcon icon={["far", "star"]} />
							<FontAwesomeIcon icon={["far", "star"]} />
							<FontAwesomeIcon icon={["far", "star"]} />
							<div className="stars-inner" style={ratingValue}>
								<FontAwesomeIcon icon="star" />
								<FontAwesomeIcon icon="star" />
								<FontAwesomeIcon icon="star" />
								<FontAwesomeIcon icon="star" />
								<FontAwesomeIcon icon="star" />
							</div>
						</div>
					</td>
				);
			}
			cells.push(<td>{itemObj[key]}</td>);
		}
		cells.push(ratingTD);

		return cells;
	}

	render() {
		const {
			data = [],
			ratingColumn,
			defaultRatingStep = 100,
			starColor = 'darkorange',
			errorMsg
		} = this.props;

		let ratingScale = defaultRatingStep * 5;

		if (errorMsg) {
			return (
				<div>{errorMsg}</div>
			);
		}

		if (data.length === 0) {
			return (
				<div style={{ padding: '10px' }}>No data</div>
			);
		} else {
			let ratingColumnArr = data.map(obj => obj[ratingColumn]);
			let maxRec = Math.max(...ratingColumnArr);
			if (maxRec > ratingScale) {
				ratingScale = ratingScale + maxRec + defaultRatingStep;
			}
		}

		return (
			<table className="Table">
				<thead>
					<tr>
						{Object.keys(data[0]).map((key) => (
							<th>{key}</th>
						))}
						<th>Rating</th>
					</tr>
				</thead>
				<tbody>
					{data.map(item => (
						<tr>
							{this.calculateRating({ item }, ratingColumn, ratingScale, starColor)}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default RatingTable;
