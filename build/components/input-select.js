"use strict";
/*
 * React component to render a select input in ioBroker admin.
 *
 * by Peter Müller <peter@crycode.de> (https://crycode.de)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const helpers_1 = require("../lib/helpers");
/**
 * A select input.
 */
class InputSelect extends React.PureComponent {
    constructor(props) {
        super(props);
        let options;
        if (Array.isArray(this.props.options)) {
            options = {};
            this.props.options.forEach((o) => options[o] = o);
        }
        else {
            options = this.props.options;
        }
        this.state = {
            id: this.props.id || helpers_1.uuidv4(),
            value: this.props.value,
            options: options
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        if (this.selectElement) {
            this.formSelect = M.FormSelect.init(this.selectElement);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                value: this.props.value
            }, () => {
                if (this.selectElement) {
                    this.formSelect = M.FormSelect.init(this.selectElement);
                }
            });
        }
        if (this.selectElement && (prevProps.disabled !== this.props.disabled || JSON.stringify(prevProps.disabledOptions) !== JSON.stringify(this.props.disabledOptions))) {
            this.formSelect = M.FormSelect.init(this.selectElement);
        }
    }
    render() {
        let className = 'input-field col s12';
        if (this.props.className) {
            className = 'input-field col ' + this.props.className;
        }
        return (React.createElement("div", { className: className },
            React.createElement("select", { id: this.state.id, value: this.state.value, onChange: this.handleChange, disabled: this.props.disabled, multiple: Array.isArray(this.props.value), ref: me => this.selectElement = me }, Object.keys(this.state.options).map((key) => {
                const attrs = {};
                if (this.props.disabledOptions && this.props.disabledOptions.indexOf(key) > -1) {
                    attrs.disabled = true;
                }
                return React.createElement("option", Object.assign({ key: key, value: key }, attrs), this.state.options[key]);
            })),
            React.createElement("label", { htmlFor: this.state.id }, this.props.label),
            this.props.children));
    }
    handleChange(event) {
        if (!this.formSelect)
            return;
        const value = (Array.isArray(this.props.value) ? this.formSelect.getSelectedValues() : event.target.value);
        this.setState({
            value: value
        }, () => {
            this.props.onChange(this.state.value);
        });
    }
}
exports.InputSelect = InputSelect;
