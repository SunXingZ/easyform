import React, { useEffect, createRef } from 'react';
import { message } from 'antd';
import { FormElement, FormProvider, FormUtils } from 'easyform';

const { checkUploadImage, getBase64 } = FormUtils;

const formItemLayout = {
	labelCol: {
		span: 2,
	},
	wrapperCol: {
		span: 12,
	},
};

const App = () => {
	let entryFormRef = createRef(null);

	const handleBeforeUpload = (name, file = {}) => {
		const { formatError, sizeError } = checkUploadImage(file, 2);
		if (formatError) {
			message.error('文件格式错误');
		}
		if (sizeError) {
			message.error('文件大小超出限制');
		}
		console.log('handleBeforeUpload', name, file);
		return !formatError && !sizeError;
	};

	const handleUploadChange = (name, file = {}, index) => {
		if (entryFormRef.current && file.originFileObj) {
			const values = entryFormRef.current.getFieldsValue();
			let newValue = '';
			if (index != undefined) {
				const valueArray = values[name] ? values[name].split(',') : [];
				valueArray[index] =
					'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
				newValue = valueArray.join(',');
			} else {
				newValue =
					'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
			}
			entryFormRef.current.setFieldsValue({
				[name]: newValue,
			});
		}
		console.log('handleUploadChange', name, file, index);
	};

	const handleRemoveUpload = (name, index) => {
		if (entryFormRef.current) {
			const values = entryFormRef.current.getFieldsValue();
			let newValue = '';
			if (index != undefined) {
				const valueArray = values[name] ? values[name].split(',') : [];
				valueArray[index] = '';
				newValue = valueArray.join(',');
			}
			entryFormRef.current.setFieldsValue({
				[name]: newValue,
			});
		}
		console.log('handleRemoveUpload', name, index);
	};

	const handleGalleryChange = async (name, file = {}, fileList = []) => {
		if (entryFormRef.current) {
			const values = entryFormRef.current.getFieldsValue();
			const valueArray = values[name] ? values[name].split(',') : [];
			if (file.status == 'removed') {
				// 删除图片
				valueArray.splice(
					valueArray.findIndex((_) => _ == file.url),
					1
				);
			}
			if (file.status == 'done') {
				// 上传完成，push接口返回的url，这里演示用base64
				const url = await getBase64(file.originFileObj);
				valueArray.push(url);
			}
			const newValue = valueArray.join(',');
			entryFormRef.current.setFieldsValue({
				[name]: newValue,
			});
		}
		console.log(name, file, fileList);
	};

	const fields = [
		{
			name: 'string',
			label: '字符串',
			elementType: 'input',
			elementProps: {
				placeholder: '请输入',
			},
			itemProps: {
				rules: [{ required: true, message: '请输入' }],
			},
			description: '字符串辅助信息',
		},
		{
			name: 'textarea',
			label: '文本框',
			elementType: 'textarea',
			elementProps: {
				placeholder: '请输入',
			},
			itemProps: {
				rules: [{ required: true, message: '请输入' }],
			},
			rightExtra: <a>查看详情</a>,
			description: '文本框辅助信息',
		},
		{
			name: 'number',
			label: '数字',
			elementType: 'number',
			elementProps: {
				disabled: true,
				placeholder: '请输入',
			},
			itemProps: {
				rules: [{ required: true, message: '请输入' }],
			},
			rightExtra: <a>获取验证码</a>,
			description: '数字辅助信息',
		},
		{
			name: 'idCard',
			label: '身份证',
			elementType: 'upload',
			elementProps: {
				buttons: ['上传人像面', '上传国徽面'],
				beforeUpload: (file) => handleBeforeUpload('idCard', file),
				handleChange: (file, index) => handleUploadChange('idCard', file, index),
				handleRemove: (index) => handleRemoveUpload('idCard', index),
			},
			itemProps: {
				rules: [{ required: true, message: '请输入名称' }],
			},
			rightExtra: <a>查看示例</a>,
			description: '图片jpg/png/jpeg等格式，单张<2MB',
		},
		{
			name: 'file',
			label: '营业执照',
			elementType: 'upload',
			elementProps: {
				buttons: ['上传营业执照'],
				beforeUpload: (file) => handleBeforeUpload('file', file),
				handleChange: (file, index) => handleUploadChange('file', file, index),
				handleRemove: (index) => handleRemoveUpload('file', index),
			},
			itemProps: {
				rules: [{ required: true, message: '请输入名称' }],
			},
			rightExtra: <a>查看示例</a>,
			description: '图片jpg/png/jpeg等格式，单张<2MB',
		},
		{
			name: 'cate',
			label: '类目',
			elementType: 'radio',
			elementProps: {},
			options: [
				{ label: ' 水果生鲜', value: 0 },
				{ label: ' 美容个护', value: 1 },
				{ label: ' 家居生活', value: 2 },
				{ label: ' 水果生鲜', value: 3 },
				{ label: ' 水果生鲜', value: 4 },
				{ label: ' 水果生鲜', value: 5 },
				{ label: ' 水果生鲜', value: 6 },
				{ label: ' 水果生鲜', value: 7 },
			],
			itemProps: {
				rules: [{ required: true, message: '请选择类目' }],
			},
			rightExtra: (
				<p>
					不知道选哪个？您可尝试 <a>搜索类目</a> 或 <a>查看类目明细</a>
				</p>
			),
			description: '一个店铺只能选择一个主营类目,普通类目入驻后，可以补充资质申请其他类目',
		},
		{
			name: 'sex',
			label: '性别',
			elementType: 'radio',
			elementProps: {},
			options: [
				{ label: '男', value: 0 },
				{ label: '女', value: 1 },
				{ label: '未知', value: 3 },
			],
			itemProps: {
				rules: [{ required: true, message: '请选择性别' }],
			},
			description: '当性别改变时用户的选项会重新加载',
		},
		{
			name: 'user',
			label: '用户',
			elementType: 'select',
			elementProps: {},
			options: {
				url: 'http://192.168.1.190:9000/api/v1/getOptions?name=category&sex=${sex}',
				dataKey: 'data',
			}, // 性别变更时加载用户
			itemProps: {
				rules: [{ required: true, message: '请选择用户' }],
			},
			description: '当用户改变时团队的选项会重新加载',
		},
		{
			name: 'team',
			label: '团队',
			elementType: 'select',
			elementProps: {},
			options: {
				url: 'http://192.168.1.190:9000/api/v1/getOptions?name=category&user=${user}', // 用户变更时加载团队
				labelKey: 'name', // 返回值中哪个字段作为label
				valueKey: 'id', // 返回值中哪个字段作为value
			},
			itemProps: {
				rules: [{ required: true, message: '请选择团队' }],
			},
		},
		{
			name: 'card',
			label: '证件类型',
			elementType: 'radio',
			elementProps: {},
			options: [
				{ label: ' 中国大陆居民身份证', value: 0 },
				{ label: ' 护照/其他海外证件', value: 1 },
			],
			itemProps: {
				rules: [{ required: true, message: '请选择证件类型' }],
			},
			description: '选择护照/其他海外证件时显示国家/地区表单',
		},
		{
			name: 'country',
			label: '国家/地区',
			elementType: 'input',
			elementProps: {},
			itemProps: {
				rules: [{ required: true }],
			},
			shouldUpdate: {
				card: 1, // card字段为1时显示此表单，如配置多个，显示条件为 && 关系
			},
		},
		{
			name: 'car',
			label: '车辆外观',
			elementType: 'gallery',
			elementProps: {
				maxLength: 3, // 最多上传张数
				beforeUpload: (file) => handleBeforeUpload('car', file),
				handleChange: (file, fileList) => handleGalleryChange('car', file, fileList),
			},
			itemProps: {
				rules: [{ required: true, message: '请上传车辆图片' }],
			},
			rightExtra: <a>查看示例</a>,
			description: '图片jpg/png/jpeg等格式，单张<2MB，最多上传3张',
		},
	];

	const handleValuesChange = (values, allValues) => {
		console.log('handleValuesChange', values, allValues);
	};

	useEffect(() => {
		if (entryFormRef.current) {
			entryFormRef.current.setFieldsValue({
				string: '一段文本',
				textarea: '今天天气不错',
				number: 1000,
				idCard:
					',https://striker.teambition.net/thumbnail/110uc16dbff39ed1c026bc2aab54868d8b44/w/100/h/100',
				car:
					'https://striker.teambition.net/thumbnail/110uc16dbff39ed1c026bc2aab54868d8b44/w/100/h/100,https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				cate: 1,
				sex: 1,
				users: '张三',
				card: 1,
				country: '中国',
			});
		}
	}, []);

	return (
		<FormProvider
			{...formItemLayout}
			ref={entryFormRef}
			labelAlign="left"
			name="entry_form"
			onValuesChange={handleValuesChange}>
			{fields.map((field, index) => (
				<FormElement {...field} key={index + field.name} />
			))}
		</FormProvider>
	);
};

export default App;
