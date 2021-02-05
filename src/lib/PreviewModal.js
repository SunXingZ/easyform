import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Image } from 'antd';

const defaultConfigs = { title: '', src: '' };

const PreviewModal = (props, ref) => {
	const [configs, setConfigs] = useState(defaultConfigs);
	const [visible, setVisible] = useState(false);

	const handleCancel = () => setVisible(false);

	useImperativeHandle(ref, () => ({
		openModal: ({ title = '', src = '' }) => {
			setConfigs({
				title,
				src,
			});
			setVisible(true);
		},
		closeModal: () => {
			setConfigs({
				title: '',
				src: '',
			});
			setVisible(false);
		},
	}));

	return (
		<Modal visible={visible} title={configs.title} footer={null} onCancel={handleCancel}>
			<Image width="100%" src={configs.src} preview={false} />
		</Modal>
	);
};

export default forwardRef(PreviewModal);
