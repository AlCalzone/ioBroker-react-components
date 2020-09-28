"use strict";
/*
 * React component to render a checkbox in ioBroker admin.
 *
 * by Peter Müller <peter@crycode.de> (https://crycode.de)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const helpers_1 = require("../lib/helpers");
/**
 * A single checkbox input.
 */
class InputCheckbox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id || helpers_1.uuidv4(),
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                value: this.props.value
            });
        }
    }
    render() {
        let className = 'input-field-checkbox col s12';
        if (this.props.className) {
            className = 'input-field-checkbox col ' + this.props.className;
        }
        return (React.createElement("div", { className: className },
            React.createElement("label", null,
                React.createElement("input", { type: 'checkbox', id: this.state.id, checked: this.state.value, onChange: this.handleChange, disabled: this.props.disabled }),
                React.createElement("span", null, this.props.label)),
            this.props.children && React.createElement(React.Fragment, null,
                React.createElement("br", null),
                this.props.children)));
    }
    handleChange() {
        this.setState({
            value: !this.state.value
        }, () => {
            this.props.onChange(this.state.value);
        });
    }
}
exports.InputCheckbox = InputCheckbox;
