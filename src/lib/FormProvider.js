import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { EventEmitter } from 'events';

class FormProvider extends PureComponent {
	constructor(props) {
		super(props);
		this.formRef = React.createRef();
		this.formEvents = new EventEmitter();
		this.state = {};
	}

	handleValuesChange = (values = {}, allValues = {}) => {
		this.formEvents.emit('onValuesChange', values, allValues);
		this.props.onValuesChange && this.props.onValuesChange(values, allValues);
	};

	componentWillUnmount() {
		this.formEvents.removeAllListeners('onValuesChange');
	}

	render() {
		return (
			<Form {...this.props} ref={this.formRef} onValuesChange={this.handleValuesChange}>
				{this.props.children({
					formRef: this.formRef,
					formEvents: this.formEvents,
				})}
			</Form>
		);
	}
}

export default FormProvider;
