import React from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import UploadImage from './UploadImage';
import UploadButton from './UploadButton';

const SingleUpload = ({
	src,
	text = '选择文件',
	handleChange = null,
	handlePreview = null,
	handleRemove = null,
	...props
}) => {
	return (
		<Upload
			{...props}
			listType="picture-card"
			showUploadList={false}
			openFileDialogOnClick={src ? false : true}
			onChange={({ file }) => handleChange && handleChange(file)}>
			{src ? (
				<UploadImage
					src={src}
					disabled={props.disabled}
					onPreview={() => handlePreview && handlePreview()}
					onRemove={() => handleRemove && handleRemove()}
				/>
			) : (
				<UploadButton text={text} />
			)}
		</Upload>
	);
};

export default SingleUpload;
