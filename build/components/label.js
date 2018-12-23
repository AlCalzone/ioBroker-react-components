"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const tooltip_1 = require("./tooltip");
/** Helper component for a settings label */
function Label(props) {
    const classNames = (props.class || []);
    return (React.createElement("label", { htmlFor: props.for, className: classNames.join(" ") },
        _(props.text),
        props.tooltip != null && React.createElement(tooltip_1.Tooltip, { text: props.tooltip })));
}
exports.Label = Label;
//# sourceMappingURL=label.js.map