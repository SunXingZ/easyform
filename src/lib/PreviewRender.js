import React from 'react';
import { Image, Space } from 'antd';

/**
 * 默认的预览模式渲染组件
 * @param {*} 
 */
const PreviewRender = ({ value = '', options = [], elementType = '' }) => {
    let element = null;
    if (['upload', 'gallery'].includes(elementType)) {
        const urlArray = value.split(',');
        element = (
            <Space direction="horizontal">
                {urlArray.map((url, index) => <Image key={url + index} width={80} src={url} />)}
            </Space>
        )
    } else if (['radio', 'select', 'checkbox'].includes(elementType)) {
        const option = options.find((option) => option.value == value);
        if (option) {
            element = <span>{option.label}</span>
        }
    } else if (['switch'].includes(elementType)) {
        element = <span>{value ? '是' : '否'}</span>;
    } else {
        element = <span>{value}</span>;
    }
    return element;
}

export default PreviewRender;