"use strict";
/*
 * React component to render a text input in ioBroker admin.
 *
 * by Peter Müller <peter@crycode.de> (https://crycode.de)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const helpers_1 = require("../lib/helpers");
/**
 * A text input.
 */
class InputText extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id || helpers_1.uuidv4(),
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        M.updateTextFields();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                value: this.props.value
            });
        }
    }
    render() {
        let className = 'input-field col s12';
        if (this.props.className) {
            className = 'input-field col ' + this.props.className;
        }
        return (React.createElement("div", { className: className },
            React.createElement("input", { type: 'text', className: 'value', id: this.state.id, value: this.state.value, onChange: this.handleChange, maxLength: this.props.maxLength, disabled: this.props.disabled }),
            React.createElement("label", { htmlFor: this.state.id }, this.props.label),
            this.props.errorMsg && React.createElement("span", { className: 'error-msg' }, this.props.errorMsg),
            this.props.children));
    }
    handleChange(event) {
        let value = event.target.value;
        if (typeof this.props.transform === 'function') {
            value = this.props.transform(value, this.state.value);
        }
        else {
            switch (this.props.transform) {
                case 'lowerCase':
                    value = value.toLowerCase();
                    break;
                case 'upperCase':
                    value = value.toUpperCase();
                    break;
            }
        }
        this.setState({
            value
        }, () => {
            this.props.onChange(this.state.value);
        });
    }
}
exports.InputText = InputText;
