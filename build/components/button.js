"use strict";
/*
 * React component to render a button in ioBroker admin.
 *
 * by Peter Müller <peter@crycode.de> (https://crycode.de)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/**
 * Renders a floating matrializecss button.
 */
class Button extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let className = `btn-floating btn-${this.props.size || 'small'} waves-effect waves-light blue`;
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (React.createElement("a", { className: className, title: this.props.title, onClick: this.props.onClick },
            React.createElement("i", { className: 'material-icons' }, this.props.iconName)));
    }
}
exports.Button = Button;
