import React from 'react';
import { Input, Radio, Checkbox, Cascader, DatePicker, Switch, TimePicker, Select } from 'antd';
import NumericInput from '../lib/NumericInput';
import MultipleUpload from '../lib/MultipleUpload';
import GalleryUpload from '../lib/GalleryUpload';

// 支持的表单类型名称
export const ComponentTypes = [
	'input',
	'number',
	'textarea',
	'select',
	'checkbox',
	'cascader',
	'radio',
	'datepicker',
	'rangepicker',
	'timepicker',
	'switch',
	'upload',
	'gallery',
];

const getFormComponent = (type = '', props = {}) => {
	const elementType = type.toLowerCase();
	const { options = [] } = props;
	let Component = null;
	switch (elementType) {
		case 'input':
			Component = <Input {...props} />;
			break;
		case 'number':
			Component = <NumericInput {...props} />;
			break;
		case 'textarea':
			Component = <Input.TextArea {...props} />;
			break;
		case 'select':
			Component = <Select {...props} options={options} />;
			break;
		case 'checkbox':
			Component = <Checkbox.Group {...props} options={options} />;
			break;
		case 'cascader':
			Component = <Cascader {...props} options={options} />;
			break;
		case 'radio':
			Component = (
				<Radio.Group {...props}>
					{options.map(({ label, value, ...args }, index) => {
						return (
							<Radio key={value + '_' + index} value={value} {...args}>
								{label}
							</Radio>
						);
					})}
				</Radio.Group>
			);
			break;
		case 'datepicker':
			Component = <DatePicker {...props} />;
			break;
		case 'rangepicker':
			Component = <DatePicker.RangePicker {...props} />;
			break;
		case 'timepicker':
			Component = <TimePicker {...props} />;
			break;
		case 'switch':
			Component = <Switch {...props} checked={Boolean(props.value)} />;
			break;
		case 'upload':
			Component = <MultipleUpload {...props} />;
			break;
		case 'gallery':
			Component = <GalleryUpload {...props} />;
			break;
	}
	return Component;
};

export default getFormComponent;
