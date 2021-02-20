import React from 'react';
import PreviewRender from '../lib/PreviewRender';

const getPreviewComponent = (mode, props = {}) => {
	let PreviewComponent = null;
	if (mode !== undefined) {
		if (typeof mode == 'boolean') {
			PreviewComponent = mode == true ? <PreviewRender {...props} /> : null;
		} else if (typeof mode == 'function') {
			const element = mode(props);
			PreviewComponent = React.isValidElement(element) ? element : null;
		} else {
			PreviewComponent = mode;
		}
	}
	return PreviewComponent;
};

export default getPreviewComponent;
