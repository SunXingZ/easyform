import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Space, Image, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const MaskStyles = {
	display: 'flex',
	justifyContent: 'center',
	position: 'absolute',
	left: 0,
	top: 0,
	right: 0,
	bottom: 0,
	backgroundColor: `rgba(0, 0, 0, 0.6)`,
	textAlign: 'center',
	transition: 'all 0.2s',
};

export const ImageMask = ({ src, disabled = false, showMask = false, ...rest }) => {
	const { onPreview = null, onRemove = null } = rest;

	return (
		<Space
			direction="horizontal"
			style={{
				...MaskStyles,
				opacity: showMask ? 1 : 0,
			}}>
			<Button
				icon={<EyeOutlined style={{ color: '#ffffff' }} />}
				type="text"
				onClick={() => onPreview && onPreview()}
			/>
			{disabled ? null : (
				<Button
					icon={<DeleteOutlined style={{ color: '#ffffff' }} />}
					type="text"
					onClick={() => onRemove && onRemove()}
				/>
			)}
		</Space>
	);
};

const UploadImage = ({ src = '', ...rest }) => {
	const [showMask, setShowMask] = useState(false);

	const handleMouseChange = ({ type }) => {
		switch (type) {
			case 'mouseover':
				setShowMask(true);
				break;
			case 'mouseout':
				setShowMask(false);
				break;
		}
	};

	return (
		<div
			style={{
				position: 'relative',
				overflow: 'hidden',
			}}
			onMouseOver={handleMouseChange}
			onMouseOut={handleMouseChange}>
			<Image src={src} width="90%" preview={false} />
			<ImageMask {...rest} src={src} showMask={showMask} />
		</div>
	);
};

export default UploadImage;
