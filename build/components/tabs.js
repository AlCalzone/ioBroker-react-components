"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Renders some components in jQuery UI tabs
const React = require("react");
class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "row", id: this.props.id },
            React.createElement("div", { className: "tabs-header col s12" },
                React.createElement("ul", { className: "tabs" }, this.props.labels.map((k, i) => React.createElement("li", { className: `tab col s${this.props.tabSize}`, key: i },
                    React.createElement("a", { href: `#${this.props.id}-${i}` }, _(k)))))),
            React.Children.map(this.props.children, (child, i) => (React.createElement("div", { className: "col s12", key: i, id: `${this.props.id}-${i}` }, child)))));
    }
}
Tabs.defaultProps = {
    id: "tabs",
    tabSize: 3,
};
exports.Tabs = Tabs;
