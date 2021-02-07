import React, { useState, useEffect } from 'react';
import { transformOptions, generateRequestUrl, getValueType, getOptionsConfigs } from '../utils';

const useOptions = (initialValue = []) => {
	const [options, setOptions] = useState(
		getValueType(initialValue) == 'array' ? transformOptions(initialValue) : []
	);

	const updateOptions = (data = []) => {
		const optionsConfigs = getOptionsConfigs(initialValue);
		const { url, ...configs } = optionsConfigs;
		if (getValueType(data) == 'array') {
			// 初始值为数组时直接使用
			setOptions(transformOptions(data, configs));
		} else if (getValueType(data) == 'object') {
			// object为当前表单的所有值，根据监听的值生成请求地址获取options
			setOptions(
				transformOptions(
					[
						{ label: '张三', value: '张三' },
						{ label: '李四', value: '李四' },
					],
					configs
				)
			);
			console.log('接口url', generateRequestUrl(url, data));
		}
	};

	return [options, updateOptions];
};

export default useOptions;
