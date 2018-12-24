"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/** Helper component for a tooltip */
function Tooltip(props) {
    return React.createElement("i", { className: "material-icons", title: _(props.text) }, "live_help");
}
exports.Tooltip = Tooltip;
