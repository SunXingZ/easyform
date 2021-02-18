import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Typography, Space } from 'antd';
import PreviewRender from './PreviewRender';
import { useOptions, useFormContext } from '../hooks';
import {
	shouldDisplay,
	getQueryVariables,
	getValueType,
	getOptionsConfigs,
	getFormComponent,
	ComponentTypes,
} from '../utils';

import 'antd/dist/antd.css';

const { Text } = Typography;

const renderPreview = (mode, props = {}) => {
	let PreviewNode = null;
	if (mode !== undefined) {
		if (typeof mode == 'boolean') {
			PreviewNode = mode == true ? <PreviewRender {...props} /> : null;
		} else if (typeof mode == 'function') {
			const element = mode(props);
			PreviewNode = React.isValidElement(element) ? element : null;
		} else {
			PreviewNode = mode;
		}
	}
	return PreviewNode;
};

/**
 * 根据配置生成对应的表单元素
 * @param {*}
 */
const FieldElement = ({
	preview = undefined,
	elementType = '',
	elementProps = {},
	rightExtra = null,
	...props
}) => {
	const FormComponent = getFormComponent(elementType, Object.assign({}, elementProps, props));
	const PreviewNode = renderPreview(preview, {
		value: props.value,
		options: props.options,
		elementType: elementType.toLowerCase(),
	});
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
			{PreviewNode == null ? FormComponent : PreviewNode}
			{rightExtra && PreviewNode == null && (
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
		shouldUpdate,
		...rest
	} = props;
	const isPreview = rest.preview !== undefined && rest.preview !== false;
	const [options, updateOptions] = useOptions(rest.options);
	const { formRef, formEvents } = useFormContext();

	// 处理options为string，object情况
	useEffect(() => {
		const optionsConfigs = getOptionsConfigs(rest.options);
		if (optionsConfigs.url && formEvents) {
			// 初次加载一次options
			const currentValues = formRef.current ? formRef.current.getFieldsValue() : {};
			updateOptions(currentValues);
			// 获取接口地址中值为表单字段的参数
			const { formVariables } = getQueryVariables(optionsConfigs.url);
			const watchFormKeys = Object.values(formVariables);
			// 如果options配置的接口表单参数字段存在则添加监听事件
			if (watchFormKeys.length > 0) {
				formEvents.addListener('onValuesChange', (values = {}, allValues = {}) => {
					const key = Object.keys(values)[0];
					if (watchFormKeys.includes(key)) {
						// 根据新生成的接口地址请求options
						updateOptions(allValues);
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
					// 预览模式下不显示扩展信息
					!isPreview ? (
						<FormExtra extra={itemProps.extra} description={description} />
					) : null
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
	name: PropTypes.string.isRequired,
	label: PropTypes.node,
	preview: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.node]),
	elementType: PropTypes.oneOf(ComponentTypes).isRequired,
	elementProps: PropTypes.object,
	itemProps: PropTypes.object,
	options: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string,
				value: PropTypes.any,
			})
		),
	]),
	rightExtra: PropTypes.node,
	description: PropTypes.node,
	shouldUpdate: PropTypes.object,
};

export default FormElement;
