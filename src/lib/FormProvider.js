import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { EventEmitter } from 'events';
import FormContext from './FormContext';

const { Provider } = FormContext;

class FormProvider extends PureComponent {
	constructor(props) {
		super(props);
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
		const { formRef, ...formProps } = this.props;
		return (
			<Provider
				value={{
					formRef,
					formEvents: this.formEvents,
				}}>
				<Form {...formProps} ref={formRef} onValuesChange={this.handleValuesChange}>
					{this.props.children}
				</Form>
			</Provider>
		);
	}
}

export default React.forwardRef((props, ref) => <FormProvider {...props} formRef={ref} />);
