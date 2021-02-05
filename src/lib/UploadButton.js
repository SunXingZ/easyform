import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const UploadButton = ({ loading = false, icon = '', text = '选择文件' }) => {
	const LoadingView = loading ? <LoadingOutlined /> : <PlusOutlined />;
	return (
		<div>
			{icon ? <Image width={40} src={icon} /> : LoadingView}
			<div style={{ marginTop: 8 }}>{text}</div>
		</div>
	);
};

export default UploadButton;