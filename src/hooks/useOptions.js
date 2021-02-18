import { useState } from 'react';
import axios from 'axios';
import { transformOptions, generateRequestUrl, getValueType, getOptionsConfigs } from '../utils';

const useOptions = (initialValue = []) => {
	const [options, setOptions] = useState(
		getValueType(initialValue) == 'array' ? transformOptions(initialValue) : []
	);

	const updateOptions = async (params = []) => {
		const optionsConfigs = getOptionsConfigs(initialValue);
		const { url, dataKey = 'data', ...configs } = optionsConfigs;
		if (getValueType(params) == 'array') {
			// 初始值为数组时直接使用
			setOptions(transformOptions(params, configs));
		} else if (getValueType(params) == 'object') {
			// object为当前表单的所有值，根据监听的值生成请求地址获取options
			const { status, data = {} } = await axios.get(generateRequestUrl(url, params));
			if (status == 200) {
				if (data[dataKey] instanceof Array) {
					setOptions(transformOptions(data[dataKey], configs));
				}
			}
		}
	};

	return [options, updateOptions];
};

export default useOptions;
