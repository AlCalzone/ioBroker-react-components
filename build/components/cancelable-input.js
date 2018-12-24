"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class CancelableInput extends React.Component {
    constructor(props) {
        super(props);
        this.beginEdit = () => {
            this.selectPending = true;
            this.setState({ editing: true });
        };
        this.onEdit = () => {
            this.setState({
                text: this.txtEdit.value,
            });
        };
        this.endEdit = (save = true) => {
            this.setState({
                editing: false,
            });
            this.selectPending = false;
            if (save) {
                if (this.state.text !== this.props.text)
                    this.props.textChanged(this.state.text);
                this.txtEdit.blur();
            }
            else {
                this.setState({ text: this.props.text }, () => this.txtEdit.blur());
            }
        };
        this.keyDown = (e) => {
            if (e.keyCode === 13 /* Enter */) {
                this.endEdit();
            }
            else if (e.keyCode === 27 /* Escape */) {
                this.endEdit(false);
            }
        };
        this.selectPending = false;
        this.state = {
            editing: false,
            text: props.text,
        };
    }
    render() {
        return (React.createElement("input", { type: "text", ref: (me) => {
                this.txtEdit = me;
                if (this.txtEdit != null && this.selectPending) {
                    this.txtEdit.select();
                    this.selectPending = false;
                }
            }, onBlur: () => this.endEdit(), onKeyDown: this.keyDown, onChange: this.onEdit, onFocus: this.beginEdit, value: this.state.text, maxLength: this.props.maxLength || 200 }));
    }
}
exports.CancelableInput = CancelableInput;
