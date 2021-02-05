import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import UploadButton from './UploadButton';
import PreviewModal from './PreviewModal';
import { transformFiles } from '../utils';

const GalleryUpload = ({
	value = '', // 默认图片url列表
	text = '选择文件',
	maxLength = 8,
	handleChange = null,
	...props
}) => {
	const previewModal = useRef(null);
	const [files, setFiles] = useState([]);

	const handlePreview = async (file = {}) => {
		const modalCurrent = previewModal.current;
		if (modalCurrent) {
			// 预览默认填充进来（编辑时）的图片
			if (file.status == 'done' && file.url) {
				modalCurrent.openModal({
					title: file.name,
					src: file.url,
				});
			} else {
				// 预览本次选择的文件
				// if (!file.url && !file.preview) {
				// 	file.preview = await getBase64(file.originFileObj);
				// }
				// modalCurrent.openModal({
				// 	title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
				// 	src: file.url || file.preview,
				// });
			}
		}
	};

	useEffect(() => {
		// 设置默认图
		setFiles(transformFiles(value.split(',')));
	}, [value]);

	return (
		<React.Fragment>
			<Upload
				{...props}
				listType="picture-card"
				fileList={files}
				onPreview={handlePreview}
				onChange={({ file, fileList = [] }) => handleChange && handleChange(file, fileList)}>
				{files.length >= maxLength ? null : <UploadButton text={text} />}
			</Upload>
			<PreviewModal ref={previewModal} />
		</React.Fragment>
	);
};

export default GalleryUpload;
