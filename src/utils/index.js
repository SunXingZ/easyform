import { endsWith } from 'lodash';

export { ComponentTypes, default as getFormComponent } from './getFormComponents';

export { default as getPreviewComponent } from './getPreviewComponent';

/**
 * 将url列表转换为指定格式
 * @param {*} files 默认图片url列表
 */
export const transformFiles = (files = []) => {
	const result = [];
	for (let i = 0; i < files.length; i++) {
		if (files[i] && typeof files[i] === 'string') {
			result.push({
				uid: String(i),
				name: files[i].substring(files[i].lastIndexOf('/') + 1),
				status: 'done',
				url: files[i],
			});
		}
	}
	return result;
};

/**
 * 获取url中的查询参数以键值对形式返回
 * @param {*} url
 */
export const getQueryVariables = (url = '') => {
	const query = url.substring(url.indexOf('?') + 1);
	const pairs = query.split('&');
	const variables = {}; // 所有查询参数
	const formVariables = {}; // 值为${name}格式的表单字段名称
	for (let i = 0; i < pairs.length; i++) {
		const [key, value] = pairs[i].split('=');
		variables[key] = value;
		if (value && value.match(/\${(\S*)\}/)) {
			formVariables[key] = value.match(/\${(\S*)\}/)[1];
		}
	}
	return {
		variables,
		formVariables,
	};
};

/**
 * 在url上追加查询参数，已有的会覆盖
 * @param {*} url
 * @param {*} query
 */
export const setQueryVariables = (url = '', query = {}) => {
	const oldQuery = getQueryVariables(url)['variables'];
	const newQuery = Object.assign({}, oldQuery, query);
	let urlString = url.substring(0, url.indexOf('?') > -1 ? url.indexOf('?') : url.length);
	urlString += '?';
	for (let key in newQuery) {
		if (newQuery[key] != undefined) {
			const param = `${key}=${newQuery[key]}`;
			urlString += endsWith(urlString, '?') ? param : `&${param}`;
		}
	}
	return urlString;
};

/**
 * 根据options配置的url和表单值生成用于get请求的url
 * @param {*} url options配置的url
 * @param {*} formValues 所有表单值
 */
export const generateRequestUrl = (url = '', formValues = {}) => {
	const { formVariables } = getQueryVariables(url);
	const newQuery = {};
	Object.keys(formVariables).map((query) => (newQuery[query] = formValues[formVariables[query]]));
	return setQueryVariables(url, newQuery);
};

/**
 * 根据shouldUpdate对象判断表单是否满足显示的条件
 */
export const shouldDisplay = (shouldUpdate = {}, getFieldValue = null) => {
	let display = true;
	if (typeof getFieldValue == 'function') {
		for (let key in shouldUpdate) {
			// 将配置的value转换成array统一处理
			const values =
				shouldUpdate[key] instanceof Array ? shouldUpdate[key] : [shouldUpdate[key]];
			display = values.includes(getFieldValue(key));
			if (!display) {
				break;
			}
		}
	}
	return display;
};

/**
 * 检测对象是否包含label和value两个字段
 * @param {*} option 检测的option对象
 */
export const checkIsOption = (option = {}) => {
	if (option.label != undefined && option.value != undefined) {
		return true;
	}
	return false;
};

/**
 * 检测options的每一项是否通过checkIsOption的验证
 * @param {*} options 检测的options数组
 */
export const checkOptions = (options = []) => {
	if (options.length == 0) {
		return true;
	}
	return options.every(checkIsOption);
};

/**
 * 将options数组每一项转换为{ label, value }格式
 * @param {*} options
 * @param {*} configs
 */
export const transformOptions = (options = [], configs = {}) => {
	const { labelKey = 'name', valueKey = 'id' } = configs;
	return checkOptions(options)
		? options
		: options.map((item) => ({ label: item[labelKey], value: item[valueKey] }));
};

/**
 * 校验图片
 * @param {*} file 文件对象
 * @param {*} maxSize 最大限制 2 = 2M
 */
export const checkUploadImage = (file = {}, maxSize = 2) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	const isLt2M = file.size / 1024 / 1024 < maxSize;
	return {
		formatError: !isJpgOrPng,
		sizeError: !isLt2M,
	};
};

/**
 * 获取base格式图片
 * @param {*} file
 */
export const getBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};

/**
 * 获取value的数据类型
 * 示例：Object.prototype.toString.call('') ;   // string
 * @param {*} value
 */
export const getValueType = (value) => {
	return Object.prototype.toString
		.call(value)
		.replace('[', '')
		.replace(']', '')
		.split(' ')[1]
		.toLowerCase();
};

/**
 * 获取options配置
 * @param {*} options
 */
export const getOptionsConfigs = (options) => {
	let optionsConfigs = {
		dataKey: 'data',
		labelKey: 'name',
		valueKey: 'id',
	};
	if (getValueType(options) == 'string') {
		optionsConfigs.url = options;
	}
	if (getValueType(options) == 'object') {
		const {
			url = '',
			dataKey = optionsConfigs.dataKey,
			labelKey = optionsConfigs.labelKey,
			valueKey = optionsConfigs.valueKey,
		} = options;
		optionsConfigs.url = url;
		optionsConfigs.dataKey = dataKey;
		optionsConfigs.labelKey = labelKey;
		optionsConfigs.valueKey = valueKey;
	}
	return optionsConfigs;
};
