"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Renders some components in jQuery UI tabs
const React = require("react");
// tslint:disable-next-line:variable-name
const M_Select = (M.FormSelect || M.Select);
class MultiDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.readStateFromUI = this.readStateFromUI.bind(this);
    }
    componentDidMount() {
        if (this.dropdown != null) {
            $(this.dropdown).on("change", this.readStateFromUI);
            this.mcssSelect = M_Select.getInstance(this.dropdown) || new M_Select(this.dropdown);
        }
    }
    componentWillUnmount() {
        if (this.dropdown != null) {
            $(this.dropdown).off("change", this.readStateFromUI);
        }
    }
    readStateFromUI() {
        if (!this.mcssSelect)
            return;
        // update the adapter settings
        this.props.checkedChanged(this.mcssSelect.getSelectedValues());
    }
    render() {
        return (React.createElement("select", { multiple: true, ref: me => this.dropdown = me, defaultValue: this.props.checkedOptions },
            React.createElement("option", { value: "", disabled: true }, _("select devices")),
            Object.keys(this.props.options).map(k => (React.createElement("option", { key: k, value: k }, this.props.options[k])))));
    }
}
MultiDropdown.defaultProps = {
    checkedOptions: [],
};
exports.MultiDropdown = MultiDropdown;
