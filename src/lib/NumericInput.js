import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class NumericInput extends React.Component {
	onChange = (e) => {
		const { value } = e.target;
		const reg = /^-?\d*(\.\d*)?$/;
		if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
			this.props.onChange(value);
		}
	};

	onBlur = () => {
		let { value = '', precision = 0, onBlur, onChange } = this.props;
		value = String(value);
		let valueTemp = value;
		if (value.charAt(value.length - 1) === '.' || value === '-') {
			valueTemp = value.slice(0, -1);
		}
		onChange(Number(valueTemp.replace(/0*(\d+)/, '$1')).toFixed(precision));
		if (onBlur) {
			onBlur();
		}
	};

	render() {
		return <Input {...this.props} onChange={this.onChange} onBlur={this.onBlur} />;
	}
}

export default NumericInput;
