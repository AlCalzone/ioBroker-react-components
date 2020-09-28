"use strict";
/*
 * React component to render a bitmask input in ioBroker admin.
 *
 * by Peter Müller <peter@crycode.de> (https://crycode.de)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const helpers_1 = require("../lib/helpers");
/**
 * Checkbox inputs for a bitmask.
 */
class InputBitmask extends React.PureComponent {
    constructor(props) {
        super(props);
        const bits = [];
        for (let i = 0; i < this.props.bits; i++) {
            bits[i] = ((this.props.value & (1 << i)) > 0);
        }
        this.state = {
            id: this.props.id || helpers_1.uuidv4(),
            value: this.props.value,
            bits: bits
        };
        this.changeBit = this.changeBit.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            const bits = [];
            for (let i = 0; i < this.props.bits; i++) {
                bits[i] = ((this.props.value & (1 << i)) > 0);
            }
            this.setState({
                value: this.props.value,
                bits: bits
            });
        }
    }
    render() {
        let className = 'input-field-checkbox col s12';
        if (this.props.className) {
            className = 'input-field-checkbox col ' + this.props.className;
        }
        return (React.createElement("div", { className: className },
            React.createElement("div", { className: 'bitmask-wrapper' },
                this.state.bits.map((bitValue, idx) => {
                    return (React.createElement("label", { key: idx },
                        React.createElement("input", { type: 'checkbox', checked: bitValue, onChange: () => this.changeBit(idx) }),
                        React.createElement("span", null, idx)));
                }),
                this.props.children && React.createElement(React.Fragment, null,
                    React.createElement("br", null),
                    this.props.children)),
            React.createElement("label", null, this.props.label)));
    }
    changeBit(idx) {
        const bits = [...this.state.bits];
        bits[idx] = !bits[idx];
        let value = 0;
        bits.forEach((b, i) => {
            if (b) {
                value |= (1 << i);
            }
        });
        this.setState({
            bits: bits,
            value: value
        }, () => {
            this.props.onChange(this.state.value);
        });
    }
}
exports.InputBitmask = InputBitmask;
