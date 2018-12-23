"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/** Helper component for a tooltip */
function Tooltip(props) {
    return React.createElement("img", { className: "admin-tooltip-icon", src: "../../img/info.png", title: _(props.text) });
}
exports.Tooltip = Tooltip;
//# sourceMappingURL=tooltip.js.map