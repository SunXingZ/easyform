import React, { useState, useEffect } from 'react';
import { transformOptions } from '../utils';

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
		} else if (typeof data == 'string') {
			// 为字符串时请求该地址获取options
		}
	};

	useEffect(() => {
		updateOptions(initialValue);
	}, []);

	return [options, updateOptions];
};

export default useOptions;