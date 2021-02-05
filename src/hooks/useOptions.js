import React, { useState, useEffect } from 'react';
import { transformOptions, generateRequestUrl } from '../utils';

const defaultConfigs = {
	labelName: 'name',
	valueName: 'id',
};

const useOptions = (initialValue = [], configs = defaultConfigs) => {
	const [options, setOptions] = useState([]);

	const updateOptions = (data = []) => {
		if (data instanceof Array) {
			// 初始值为数组时直接使用
			setOptions(transformOptions(data, configs));
		} else if (typeof data == 'object') {
			// 为字符串时请求该地址获取options
			setOptions(
				transformOptions(
					[
						{ label: '张三', value: '张三' },
						{ label: '李四', value: '李四' },
					],
					configs
				)
			);
			console.log('接口url', generateRequestUrl(initialValue, data));
		}
	};

	useEffect(() => {
		updateOptions(initialValue);
	}, []);

	return [options, updateOptions];
};

export default useOptions;
