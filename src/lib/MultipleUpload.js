import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import SingleUpload from './SingleUpload';
import PreviewModal from './PreviewModal';

const MultipleUpload = ({
	value = '',
	buttons = [''],
	handleChange = null,
	handleRemove = null,
	...props
}) => {
	const previewModal = useRef(null);
	const [items, setItems] = useState([]);

	const handlePreview = (src) => {
		const modalCurrent = previewModal.current;
		if (modalCurrent) {
			modalCurrent.openModal({
				title: src.substring(src.lastIndexOf('/') + 1),
				src,
			});
		}
	};

	useEffect(() => {
		const valueArray = value.split(',');
		setItems(valueArray);
	}, [value]);

	return (
		<React.Fragment>
			<Space direction="horizontal" style={{ marginTop: 8 }}>
				{buttons.map((item, index) => (
					<SingleUpload
						{...props}
						key={index + item}
						src={items[index]}
						text={item}
						handleChange={(file) => handleChange && handleChange(file, index)}
						handlePreview={() => handlePreview(items[index])}
						handleRemove={() => handleRemove && handleRemove(index)}
					/>
				))}
			</Space>
			<PreviewModal ref={previewModal} />
		</React.Fragment>
	);
};

export default MultipleUpload;
