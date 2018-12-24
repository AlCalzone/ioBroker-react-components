"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Renders some components in jQuery UI tabs
const React = require("react");
// tslint:disable-next-line:variable-name
const M_Select = (M.FormSelect || M.Select);
class MultiDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedOptions: props.checkedOptions,
        };
        this.readStateFromUI = this.readStateFromUI.bind(this);
    }
    componentDidMount() {
        this.updateUI();
        if (this.dropdown != null) {
            $(this.dropdown).on("change", this.readStateFromUI);
            this.mcssSelect = new M_Select(this.dropdown);
        }
    }
    componentWillUnmount() {
        if (this.dropdown != null) {
            $(this.dropdown).off("change", this.readStateFromUI);
        }
    }
    componentDidUpdate() {
        this.updateUI();
    }
    updateUI() {
        if (!this.dropdown)
            return;
        const $dropdown = $(this.dropdown);
        $dropdown.find("option:selected").prop("selected", false);
        this.state.checkedOptions.forEach(val => {
            $dropdown.find(`option[value="${val}"]`).prop("selected", true);
        });
    }
    readStateFromUI() {
        if (!this.mcssSelect)
            return;
        // read data from UI
        this.setState({ checkedOptions: this.mcssSelect.getSelectedValues() }, () => {
            // update the adapter settings
            this.props.checkedChanged(this.state.checkedOptions);
        });
    }
    render() {
        return (React.createElement("select", { multiple: true, ref: (me) => this.dropdown = me, defaultValue: [""] },
            React.createElement("option", { value: "", disabled: true }, _("select devices")),
            Object.keys(this.props.options).map(k => (React.createElement("option", { key: k, value: k }, this.props.options[k])))));
    }
}
MultiDropdown.defaultProps = {
    checkedOptions: [],
};
exports.MultiDropdown = MultiDropdown;
