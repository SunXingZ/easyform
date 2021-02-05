import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	Input,
	Typography,
	Space,
	Radio,
	Checkbox,
	Cascader,
	DatePicker,
	Switch,
	TimePicker,
	Select,
} from 'antd';
import NumericInput from './NumericInput';
import MultipleUpload from './MultipleUpload';
import GalleryUpload from './GalleryUpload';
import { useOptions } from '../hooks';
import { shouldDisplay, getQueryVariables, setQueryVariables } from '../utils';

const { Text } = Typography;

// 支持的表单类型名称
const supportElementTypes = [
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

/**
 * 根据配置生成对应的表单元素
 * @param {*}
 */
const FieldElement = ({
	editable = true,
	elementType = '',
	elementProps = {},
	options = [],
	rightExtra = null,
	...props
}) => {
	elementType = elementType.toLowerCase();
	let Element = null;
	switch (elementType) {
		case 'input':
			Element = <Input {...elementProps} {...props} />;
			break;
		case 'number':
			Element = <NumericInput {...elementProps} {...props} />;
			break;
		case 'textarea':
			Element = <Input.TextArea {...elementProps} {...props} />;
			break;
		case 'select':
			Element = <Select {...elementProps} {...props} options={options} />;
			break;
		case 'checkbox':
			Element = <Checkbox.Group {...elementProps} {...props} options={options} />;
			break;
		case 'cascader':
			Element = <Cascader {...elementProps} {...props} options={options} />;
			break;
		case 'radio':
			Element = (
				<Radio.Group {...elementProps} {...props}>
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
			Element = <DatePicker {...elementProps} {...props} />;
			break;
		case 'rangepicker':
			Element = <DatePicker.RangePicker {...elementProps} {...props} />;
			break;
		case 'timepicker':
			Element = <TimePicker {...elementProps} {...props} />;
			break;
		case 'switch':
			Element = <Switch {...elementProps} {...props} checked={Boolean(props.value)} />;
			break;
		case 'upload':
			Element = <MultipleUpload {...elementProps} {...props} />;
			break;
		case 'gallery':
			Element = <GalleryUpload {...elementProps} {...props} />;
			break;
	}
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
			{editable ? Element : <span>{props.value}</span>}
			{rightExtra && editable != false && (
				<div style={{ minWidth: 80, paddingLeft: 10 }}>{rightExtra}</div>
			)}
		</div>
	);
};

/**
 * 显示表单底部的扩展信息
 * @param {*}
 */
const FormExtra = ({ extra = '', description = '' }) => {
	return (
		<Space direction="vertical" style={{ marginTop: 8 }}>
			{extra && extra}
			{description && <Text type="secondary">{description}</Text>}
		</Space>
	);
};

const FormElement = (props) => {
	const {
		label = '',
		name = '',
		description = '',
		itemProps = {},
		formRef = {},
		formEvents = null,
		shouldUpdate,
		...rest
	} = props;
	const [options, updateOptions] = useOptions(rest.options);

	useEffect(() => {
		// 注册onValuesChange事件监听并根据依赖字段更新options
		if (formEvents && typeof rest.options == 'string' && rest.editable != false) {
			const { formVariables } = getQueryVariables(rest.options);
			const watchFormKeys = Object.values(formVariables);
			if (watchFormKeys.length > 0) {
				formEvents.addListener('onValuesChange', (values = {}, allValues = {}) => {
					const key = Object.keys(values)[0];
					if (watchFormKeys.includes(key)) {
						const newQuery = {};
						Object.keys(formVariables).map(
							(query) => (newQuery[query] = allValues[formVariables[query]])
						);
						// updateOptions(setQueryVariables(rest.options, newQuery)); // 根据新生成的接口地址请求options
						// 模拟更新
						if (key == 'sex') {
							if (values[key] == 0) {
								updateOptions([
									{ label: '张三', value: '张三' },
									{ label: '李四', value: '李四' },
									{ label: '王二麻子', value: '王二麻子' },
								]);
							}
							if (values[key] == 1) {
								updateOptions([
									{ label: '小红', value: '小红' },
									{ label: '小绿', value: '小绿' },
									{ label: '小花', value: '小花' },
								]);
							}
							if (values[key] == 3) {
								updateOptions([]);
							}
						}
					}
				});
			}
		}
	}, []);

	const FormNode = () => {
		const FormItem = (
			<Form.Item
				{...itemProps}
				label={label}
				name={name}
				extra={
					// 不可编辑模式下不显示扩展信息
					rest.editable == false ? null : (
						<FormExtra extra={itemProps.extra} description={description} />
					)
				}>
				<FieldElement {...rest} options={options} />
			</Form.Item>
		);
		if (typeof shouldUpdate == 'object') {
			const shouldUpdateKeys = Object.keys(shouldUpdate);
			return (
				<Form.Item
					noStyle
					shouldUpdate={(prevValues, curValues) =>
						shouldUpdateKeys
							.map((key) => prevValues[key] != curValues[key])
							.includes(true)
					}>
					{({ getFieldValue }) =>
						shouldDisplay(shouldUpdate, getFieldValue) ? FormItem : null
					}
				</Form.Item>
			);
		}
		return FormItem;
	};

	return <FormNode />;
};

FormElement.propTypes = {
	name: PropTypes.string.isRequired, // 表单name，antd字段
	label: PropTypes.string, // 表单label，antd字段
	editable: PropTypes.bool, // 表单是否可编辑，为false时表单组件展现为文本
	elementType: PropTypes.oneOf(supportElementTypes).isRequired, // 表单类型，自定义字段
	elementProps: PropTypes.object, // 表单元素的配置项，详见antd组件文档
	itemProps: PropTypes.object, // Form.Item的配置项，详见antd组件文档
	options: PropTypes.oneOfType([
		// select，radio，checkbox等表单的选项数组
		PropTypes.string, // 作为接口名称+query使用
		PropTypes.arrayOf(
			// 可以直接使用
			PropTypes.shape({
				label: PropTypes.string,
				value: PropTypes.any,
			})
		),
	]),
	rightExtra: PropTypes.node, // 显示在表单右侧的扩展信息
	bottomExtra: PropTypes.node, // 显示在表单底部的扩展信息
	description: PropTypes.node, // 显示在表单最底部的描述信息
	shouldUpdate: PropTypes.object, // 配置表单显示与隐藏的字段
};

export default FormElement;
